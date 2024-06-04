import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">Hello</h1>
      <Button
        color="primary"
        variant="bordered"
        as={Link}
        href="/members"
        startContent={<FaRegSmile size={20} />}
      >
        Click me
      </Button>
    </div>
  );
}
