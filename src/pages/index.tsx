import Chat from "./components/Chat/ChatMain";
import Sidebar from "./components/Sidebar/SidebarMain";
import { GetServerSidePropsContext, NextPage } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const Home: NextPage = ({ user }: any) => {
  return (
    <div className="flex h-full">
      <Sidebar user={user} />
      <Chat />
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
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
