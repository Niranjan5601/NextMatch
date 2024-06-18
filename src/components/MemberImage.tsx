'use client';
import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useRole";
import { Button, Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import clsx from "clsx";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";
type Props = {
  photo: Photo | null;
};
export default function MemberImage({ photo }: Props) {
  const role = useRole();
  const router = useRouter();

  if(!photo)return null;

  const approve = async(photoId:string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error:any) {
      toast.error(error.message);
    }
  }

  const reject = async (photo:Photo) =>{
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error:any) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved && role !== 'ADMIN'
          })}
          priority
        />
      ) : (
        <Image
          width={300}
          height={300}
          src={photo?.url || '/images/user.png'}
          alt="Image of member"
          className="object-cover aspect-square"
        />
      )}
      {!photo?.isApproved && role !== 'ADMIN' && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>

        </div>
      )}
      {role === 'ADMIN' &&(
        <div className="flex flex-row gap-2 mt-2">
          <Button color="success" onClick={() => approvePhoto(photo.id)} variant="bordered" fullWidth>
            <ImCheckmark size={20}/>
          </Button>
          <Button color="danger" onClick={() => rejectPhoto(photo)} variant="bordered" fullWidth>
            <ImCross size={20}/>
          </Button>
        </div>
      )}
    </div>
  );
}
