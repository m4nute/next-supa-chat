import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Topbar from "./Topbar/TopbarMain";
import SearchBar from "./OpenedChats/SearchBar";
import AddChatButton from "./OpenedChats/AddChatButton";
import OpenedChats from "./OpenedChats/OpenedChatsMain";

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

  async function getIds() {
    const { data } = await supabase
      .from("chat_users")
      .select("chat_id")
      .eq("user_id", user?.id);

    return data?.map((obj) => obj.chat_id);
  }

  return (
    <div className="min-h-full w-1/5 border-r border-gray-700 bg-[#1c1c1c] shadow-lg">
      <Topbar user={user} />
      <div className="my-3 flex">
        <SearchBar filterText={filterText} setFilterText={setFilterText} />
        <AddChatButton />
      </div>
      <OpenedChats chatList={filteredList} />
    </div>
  );
}
