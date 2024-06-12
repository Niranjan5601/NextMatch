import { transformImageUrl } from "@/lib/util";
import { MessageDto } from "@/types";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import React from "react";

type Props = {
  message: MessageDto;
  currentUserId: string;
};

export default function MessageBox({ message, currentUserId }: Props) {
  const renderAvatar = () => (
    <Avatar
      name={message.senderName}
      className="self-end"
      src={transformImageUrl(message.senderImage) || "/images/user.png"}
    />
  );
  const isCurrentUserSender = message.senderId === currentUserId;
  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3,", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        <div>Message Content</div>
        {isCurrentUserSender && renderAvatar()}
      </div>
    </div>
  );
}
