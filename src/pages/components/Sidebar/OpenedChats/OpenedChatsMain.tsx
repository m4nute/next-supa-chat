import { useQuery } from "@tanstack/react-query"
import useStore from "~/zustand/globalState"
import BeatLoader from "react-spinners/BeatLoader"
import { getActiveChats } from "~/pages/queries/queryFns"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react"

export default function OpenedChats({ user, filterText }: { user: any; filterText: string }) {
  const [selectedChat, setSelectedChat, setSelectedUser] = useStore((state) => [state.selectedChat, state.setSelectedChat, state.setSelectedUser])
  const supabase = useSupabaseClient()

  const { data: chatInfos, isLoading } = useQuery({
    queryKey: ["getChatInfos"],
    queryFn: () => getActiveChats(user.id, supabase),
    enabled: !!user?.id,
  })

  // useEffect(() => {
  //   const channel = supabase
  //     .channel("realtime chats")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "chat_users",
  //         filter: `user_id=eq.${user.id}`,
  //       },
  //       () => refetch()
  //     )
  //     .subscribe()
  //   return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, [])

  const filteredChats = chatInfos?.filter((chat) =>
    //   @ts-ignore
    chat.user?.email.includes(filterText)
  )

  return (
    <>
      {filteredChats?.length ? (
        filteredChats.map((chat: any, index: number) => (
          <button
            key={index}
            className={`w-full border-y border-gray-600 px-3 py-2 text-sm ${selectedChat === chat.chatId && "bg-message"}`}
            onClick={() => {
              setSelectedChat(chat.chatId)
              setSelectedUser(chat.user)
            }}>
            {chat.user.email.split("@")[0]}
          </button>
        ))
      ) : (
        <h2 className="text-center">{isLoading ? <BeatLoader loading={true} size={10} color="#d2d2d2" /> : "No Chats Found :c"}</h2>
      )}
    </>
  )
}
