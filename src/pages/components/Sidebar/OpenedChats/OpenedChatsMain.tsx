import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import useStore from "~/zustand/globalState";

export default function OpenedChats({
  user,
  filterText,
}: {
  user: any;
  filterText: string;
}) {
  const supabase = useSupabaseClient();

  const [selectedChat, setSelectedChat, setSelectedUser] = useStore((state) => [
    state.selectedChat,
    state.setSelectedChat,
    state.setSelectedUser,
  ]);

  const { data: chatInfos, isLoading } = useQuery({
    queryKey: ["getChatInfos"],
    queryFn: async () => {
      const { data: chatIds } = await supabase
        .from("chat_users")
        .select("chat_id")
        .eq("user_id", user?.id);

      const { data: userList } = await supabase
        .from("chat_users")
        .select("profiles (avatar_url, email)")
        .neq("user_id", user?.id)
        .in(
          "chat_id",
          // @ts-ignore
          chatIds?.map(({ chat_id }) => chat_id)
        );

      return chatIds?.map((chat, index) => ({
        chatId: chat.chat_id,
        user: userList?.[index]?.profiles,
      }));
    },
    enabled: !!user?.id,
  });

  const filteredList = chatInfos?.filter((chat) =>
    //   @ts-ignore
    chat.user?.email.includes(filterText)
  );

  return (
    <ul>
      {filteredList?.length! > 0 ? (
        filteredList?.map((chat: any, index: number) => {
          return (
            <li key={index}>
              <button
                className={`w-full border-y border-gray-600 px-3 py-2 text-sm ${
                  selectedChat === chat.chatId && "bg-[#292929]"
                }`}
                onClick={() => {
                  setSelectedChat(chat.chatId);
                  setSelectedUser(chat.user);
                }}
              >
                {chat.user.email.split("@")[0]}
              </button>
            </li>
          );
        })
      ) : isLoading ? (
        <h2 className="text-center">Loading</h2>
      ) : (
        <h2 className="text-center">No Chats Found :c</h2>
      )}
    </ul>
  );
}
