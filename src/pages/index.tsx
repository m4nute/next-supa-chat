import { useState } from "react";
import Chat from "./components/Chat/ChatMain";
import Sidebar from "./components/Sidebar/SidebarMain";
import { GetServerSidePropsContext, NextPage } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const Home: NextPage = ({ user }: any) => {
  const [selectedChat, setSelectedChat] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<any>();

  return (
    <div className="flex h-full">
      <Sidebar
        setSelectedChat={setSelectedChat}
        setSelectedUser={setSelectedUser}
        selectedChat={selectedChat}
        user={user}
      />
      {selectedChat ? (
        <Chat id={selectedChat} receiver={selectedUser} />
      ) : (
        <h1 className="mt-6 w-4/5 text-center">Select a Chat!</h1>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };

  return {
    props: {
      user: session.user,
    },
  };
};
