import ChatTopbar from "./ChatTopbar";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { useUser } from "@supabase/auth-helpers-react";
import useStore from "~/zustand/globalState";

export default function Chat() {
  const user = useUser();

  const [selectedChat] = useStore((state) => [state.selectedChat]);

  return (
    <div className="w-4/5">
      {selectedChat ? (
        <>
          <ChatTopbar />
          <MessageList user={user} />
          <MessageForm user={user} />
        </>
      ) : (
        <h1 className="mt-6 text-center">Select a Chat!</h1>
      )}
    </div>
  );
}
