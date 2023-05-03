import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Chat from "./components/Chat";

const Home: NextPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [selectedChat, setSelectedChat] = useState();

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
      .select("profiles (username)")
      .neq("user_id", user?.id)
      .in("chat_id", chatIds!);
    // @ts-ignore
    return data?.map((obj) => obj?.profiles?.username);
  }

  const { data: chatIds } = useQuery({
    queryKey: ["getChatIds"],
    queryFn: getIds,
    enabled: !!user?.id,
  });

  const {
    isLoading,
    data: userList,
    isError,
  } = useQuery({
    queryKey: ["getChats"],
    queryFn: getUserChats,
    enabled: !!chatIds,
  });

  return (
    <div className="flex h-full">
      <div className="min-h-full w-1/5 bg-[#232323]">
        <h1>Chats</h1>
        <ul>
          {userList?.map((user: any, index: number) => {
            return (
              <li key={index}>
                <button
                  className={`w-full border-y border-gray-600 px-3 py-2 ${
                    selectedChat === chatIds?.[index] && "bg-[#292929]"
                  }`}
                  onClick={() => setSelectedChat(chatIds?.[index])}
                >
                  {user}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {selectedChat ? <Chat id={selectedChat} /> : <h1>Select a Chat!</h1>}
    </div>
  );
};

export default Home;
