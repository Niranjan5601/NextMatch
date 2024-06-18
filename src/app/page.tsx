import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import { signOut } from "@/auth";

import { FaRegSmile } from "react-icons/fa";
import ClientSession from "@/components/ClientSession";
import { GiMatchTip } from "react-icons/gi";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
      <GiMatchTip size={100} />
      <h1 className="text-4xl font-bold">Welcome to NextMatch</h1>
      {session ? (
        <Button as={Link} href="/members" size="lg" color="secondary" variant="bordered">
          Continue
        </Button>
      ) : (
        <div className="flex flex-row gap-4">
          <Button as={Link} href="/login" size="lg" color="secondary" variant="bordered">
            Sign in
          </Button>
          <Button as={Link} href="/register" size="lg" color="secondary" variant="bordered">
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
