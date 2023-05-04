import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Chat from "./components/Chat";
import * as Avatar from '@radix-ui/react-avatar'

const Home: NextPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [selectedChat, setSelectedChat] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<any>();
  const [filterText, setFilterText] = useState<string>("")


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

  // @ts-ignore
  const filteredList = userList?.filter((user) => user?.username.includes(filterText))


  return (
    <div className="flex h-full">
      <div className="min-h-full w-1/5 bg-[#1c1c1c] shadow-lg border-r border-gray-700">
        <div className=" px-2 flex h-16 bg-[#262930]">
          <div className="justify-center flex flex-col">
            <Avatar.Root className="h-[2.5rem] w-[2.5rem] select-none items-center  overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={user?.user_metadata.avatar_url}
                alt="Profile Picture"
              />
              <Avatar.Fallback className="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                {user?.email?.slice(0, 2)}
              </Avatar.Fallback>

            </Avatar.Root>
          </div>
          <h1 className="text-lg ml-3 flex flex-col justify-center">{user?.user_metadata.name ? user?.user_metadata.name : user?.email}</h1>
        </div>
        <div className="my-2 w-5/6 block mx-auto">
          <input type="text" placeholder="Search (username)" value={filterText} className="bg-[#333333] rounded-lg py-1.5 px-2 w-full" onChange={(e) => setFilterText(e.target.value)} />
        </div>
        <ul>
          {!isLoading && filteredList?.length! > 0 ? filteredList?.map((user: any, index: number) => {
            return (
              <li key={index}>
                <button
                  className={`w-full border-y border-gray-600 px-3 py-2 ${selectedChat === chatIds?.[index] && "bg-[#292929]"
                    }`}
                  onClick={() => {
                    setSelectedChat(chatIds?.[index]);
                    setSelectedUser(user);
                  }}
                >
                  {user.username}
                </button>
              </li>
            )
          }) : <h2 className="text-center">No Chats Found</h2>}
        </ul>
      </div>
      {selectedChat ? (
        <Chat id={selectedChat} receiver={selectedUser} />
      ) : (
        <h1 className="mt-6 text-center w-full">Select a Chat!</h1>
      )}
    </div>
  );
};

export default Home;
