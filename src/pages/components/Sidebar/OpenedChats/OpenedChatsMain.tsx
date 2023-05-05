import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export default function OpenedChats() {
  const supabase = useSupabaseClient();

  const { isLoading, data: userList } = useQuery({
    queryKey: ["getChats"],
    queryFn: getUserChats,
    enabled: !!chatIds,
  });

  async function getUserChats() {
    const { data } = await supabase
      .from("chat_users")
      .select("profiles (avatar_url, email)")
      .neq("user_id", user?.id)
      .in("chat_id", chatIds!);
    // @ts-ignore
    return data?.map((obj) => obj?.profiles);
  }

  const filteredList = userList?.filter((user) =>
    // @ts-ignore
    user?.email.includes(filterText)
  );

  return (
    <ul>
      {filteredList?.length! > 0 ? (
        filteredList?.map((user: any, index: number) => {
          return (
            <li key={index}>
              <button
                className={`w-full border-y border-gray-600 px-3 py-2 text-sm ${
                  selectedChat === chatIds?.[index] && "bg-[#292929]"
                }`}
                onClick={() => {
                  setSelectedChat(chatIds?.[index]);
                  setSelectedUser(user);
                }}
              >
                {user.email.split("@")[0]}
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
