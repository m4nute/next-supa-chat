import ChatTopbar from "./ChatTopbar";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useUser } from "@supabase/auth-helpers-react";

export default function Chat({ id, receiver }: { id: number; receiver: any }) {
  const user = useUser();

  return (
    <div className="w-4/5">
      <ChatTopbar receiver={receiver} />
      <MessageList user={user} id={id} />
      <MessageForm user={user} id={id} />
    </div>
  );
}
