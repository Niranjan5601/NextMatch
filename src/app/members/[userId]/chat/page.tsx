import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const messages = await getMessageThread(params.userId);
  const userId = await getAuthUserId();
  const body = (
    <div>
      {messages.length === 0 ? "No messages to display":(
        <div>
          {messages.map(message => (
            <MessageBox key={message.id} currentUserId={userId} message={message}/>
          ))}
        </div>
      )}
    </div>
  )

  console.log({ messages });
  return (
    <CardInnerWrapper
      header="Chat"
      body={body}
      footer={<ChatForm />}
    />
  );
}
