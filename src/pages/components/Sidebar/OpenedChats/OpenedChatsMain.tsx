import { useQuery } from "@tanstack/react-query"
import { getActiveChats } from "../../../../queries/allQueries"
import { User, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import ChatCard from "./SpecificChat/ChatCard"
import UnresolvedStates from "./UnresolvedStates"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function OpenedChats({ user, filterText }: { user: User | null; filterText: string }) {
  const supabase = useSupabaseClient()

  useEffect(() => {
    const channel = supabase
      .channel("realtime chats")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_users",
          filter: `user_id=eq.${user?.id}`,
        },
        () => refetch()
      )
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

  const [animationParent] = useAutoAnimate()

  return (
    <div className="pl-2 pr-2 overflow-y-scroll h-[calc(100vh-134.4px)]">
      {filteredChats?.length ? (
        <ul ref={animationParent}>
          {filteredChats.map((chat: any, index: number) => (
            <ChatCard chat={chat} index={index} key={index} />
          ))}
        </ul>
      ) : (
        <UnresolvedStates isLoading={isLoading} />
      )}
    </div>
  )
}
