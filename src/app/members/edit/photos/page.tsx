
import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import React from "react";

import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";

import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";


export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-secondary">
        Edit Profile
        </div>
        <MemberPhotoUpload/>
      </CardHeader>
      <Divider />
      <CardBody>
        
        <MemberPhotos photos={photos}/>
      </CardBody>
    </>
  );
}
