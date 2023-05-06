import { useQuery } from "@tanstack/react-query"
import BeatLoader from "react-spinners/BeatLoader"
import { getActiveChats } from "~/pages/queries/allQueries"
import { User, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import ChatCard from "./SpecificChat/ChatCard"

export default function OpenedChats({ user, filterText }: { user: User | null; filterText: string }) {
  const supabase = useSupabaseClient()

  useEffect(() => {
    const channel = supabase
      .channel("realtime chats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_users",
          filter: `user_id=eq.${user?.id}`,
        },
        () => refetch()
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const {
    data: chatInfos,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getChatInfos"],
    queryFn: () => getActiveChats(user?.id, supabase),
    enabled: !!user?.id,
  })

  //couldnt get user type to work properly
  const filteredChats = chatInfos?.filter((chat: { chatId: number; user: any }) => chat.user?.email.includes(filterText))

  return (
    <div className="ml-2 mr-3">
      {filteredChats?.length ? (
        filteredChats.map((chat: any, index: number) => <ChatCard chat={chat} index={index} key={index} />)
      ) : (
        <h2 className="text-center">{isLoading ? <BeatLoader loading={true} size={10} color="#d2d2d2" /> : "No Chats Found :c"}</h2>
      )}
    </div>
  )
}
