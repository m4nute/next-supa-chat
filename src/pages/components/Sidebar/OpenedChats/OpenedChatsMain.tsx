import { useQuery } from "@tanstack/react-query"
import BeatLoader from "react-spinners/BeatLoader"
import { getActiveChats } from "~/pages/queries/allQueries"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import ChatCard from "./ChatCard"

export default function OpenedChats({ user, filterText }: { user: any; filterText: string }) {
  const supabase = useSupabaseClient()

  const {
    data: chatInfos,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getChatInfos"],
    queryFn: () => getActiveChats(user.id, supabase),
    enabled: !!user?.id,
  })

  useEffect(() => {
    const channel = supabase
      .channel("realtime chats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_users",
          filter: `user_id=eq.${user.id}`,
        },
        () => refetch()
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredChats = chatInfos?.filter((chat) =>
    //   @ts-ignore
    chat.user?.email.includes(filterText)
  )

  return (
    <>{filteredChats?.length ? filteredChats.map((chat: any, index: number) => <ChatCard chat={chat} index={index} />) : <h2 className="text-center">{isLoading ? <BeatLoader loading={true} size={10} color="#d2d2d2" /> : "No Chats Found :c"}</h2>}</>
  )
}
