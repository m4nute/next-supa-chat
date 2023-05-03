import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@supabase/auth-helpers-react";

const Home: NextPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  async function getUserChats() {
    return await supabase
      .from("chat_users")
      .select("chat_id")
      .eq("user_id", user?.id);
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ["getChats"],
    queryFn: getUserChats,
    enabled: !!user?.id,
  });

  console.log(data?.data);

  return (
    <div>
      <h1>Chats</h1>
      <ul className="">
        {data?.data?.map((chat: any, index: number) => {
          return <li key={index}>{chat.chat_id}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
