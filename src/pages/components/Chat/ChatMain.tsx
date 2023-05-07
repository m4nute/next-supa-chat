import ChatTopbar from "./ChatTopbar"
import MessageList from "./Messages/MessageList"
import MessageForm from "./Messages/MessageForm"
import { User } from "@supabase/auth-helpers-react"
import useStore from "~/zustand/globalState"

export default function Chat({ user }: { user: User | null }) {
  const [selectedChat] = useStore((state) => [state.selectedChat])

  return (
    <div className="w-full md:w-2/3 lg:w-3/4">
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
  )
}
