import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";

import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const messages = await getMessageThread(params.userId);
  const userId = await getAuthUserId();
 const chatId = createChatId(userId,params.userId);

  console.log({ messages });
  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList initialMessages={messages} currentUserId={userId} chatId={chatId}/>
      }
      footer={<ChatForm />}
    />
  );
}
