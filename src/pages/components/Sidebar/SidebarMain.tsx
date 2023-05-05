import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Topbar from "./Topbar/TopbarMain";
import SearchBar from "./SearchBar";

export default function Sidebar({
  setSelectedUser,
  setSelectedChat,
  selectedChat,
  user,
}: any) {
  const supabase = useSupabaseClient();
  const [filterText, setFilterText] = useState<string>("");

  const { data: chatIds } = useQuery({
    queryKey: ["getChatIds"],
    queryFn: getIds,
    enabled: !!user?.id,
  });

  const { isLoading, data: userList } = useQuery({
    queryKey: ["getChats"],
    queryFn: getUserChats,
    enabled: !!chatIds,
  });

  const filteredList = userList?.filter((user) =>
    // @ts-ignore
    user?.username.includes(filterText)
  );

  async function getIds() {
    const { data } = await supabase
      .from("chat_users")
      .select("chat_id")
      .eq("user_id", user?.id);

    return data?.map((obj) => obj.chat_id);
  }

  async function getUserChats() {
    const { data } = await supabase
      .from("chat_users")
      .select("profiles (username, avatar_url, email)")
      .neq("user_id", user?.id)
      .in("chat_id", chatIds!);
    // @ts-ignore
    return data?.map((obj) => obj?.profiles);
  }

  return (
    <div className="min-h-full w-1/5 border-r border-gray-700 bg-[#1c1c1c] shadow-lg">
      <Topbar user={user} />
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      <ul>
        {filteredList?.length! > 0 ? (
          filteredList?.map((user: any, index: number) => {
            return (
              <li key={index}>
                <button
                  className={`w-full border-y border-gray-600 px-3 py-2 ${
                    selectedChat === chatIds?.[index] && "bg-[#292929]"
                  }`}
                  onClick={() => {
                    setSelectedChat(chatIds?.[index]);
                    setSelectedUser(user);
                  }}
                >
                  {user.username}
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
    </div>
  );
}
