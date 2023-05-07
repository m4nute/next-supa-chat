import { User, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import useStore from "~/zustand/globalState"
import MessageCard from "./MessageCard"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { getChatMessages } from "~/pages/queries/allQueries"

export default function MessageList({ user }: { user: User | null }) {
  const selectedChat = useStore((state) => state.selectedChat)
  const supabase = useSupabaseClient()

  async function getMessages() {
    const { data } = await getChatMessages(supabase, selectedChat)
    return data
  }

  const { data: messages, refetch } = useQuery({
    queryKey: ["getChatMessages", selectedChat],
    queryFn: getMessages,
  })

  useEffect(() => {
    const channel = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chats",
          filter: `id=eq.${selectedChat}`,
        },
        () => refetch()
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedChat])

  const [animationParent] = useAutoAnimate({ duration: 300 })

  return (
    <div className="px-10 pt-2 h-[calc(100vh-9rem)] overflow-y-scroll flex-col-reverse flex">
      <ul ref={animationParent}>
        {messages?.map((message: any, index: number) => {
          return <MessageCard user={user} message={message} key={index} />
        })}
      </ul>
    </div>
  )
}
