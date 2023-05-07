import { User, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import useStore from "~/zustand/globalState"
import MessageCard from "./MessageCard"
import { getMessages } from "~/pages/queries/allQueries"

export default function MessageList({ user }: { user: User | null }) {
  const selectedChat = useStore((state) => state.selectedChat)
  const supabase = useSupabaseClient()

  const { data: messages, refetch } = useQuery({
    queryKey: ["getChatMessages", selectedChat],
    queryFn: () => getMessages(supabase, selectedChat),
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
        async () => {
          await refetch()
          //@ts-ignore
          myElementRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedChat])

  const myElementRef = useRef(null)
  return (
    <div className={`px-10 pt-2 h-[calc(100vh-9rem)] overflow-y-scroll flex-col-reverse flex`} ref={myElementRef}>
      <ul>
        {messages?.map((message: any, index: number) => {
          return <MessageCard user={user} message={message} key={index} />
        })}
      </ul>
    </div>
  )
}
