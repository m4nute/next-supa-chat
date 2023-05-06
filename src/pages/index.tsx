import Chat from "./components/Chat/ChatMain"
import Sidebar from "./components/Sidebar/SidebarMain"
import { GetServerSidePropsContext } from "next"
import { User, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

const Home = ({ user }: { user: User | null }) => {
  return (
    <div className="flex h-full">
      <Sidebar user={user} />
      <Chat />
    </div>
  )
}

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user)
    return {
      redirect: { destination: "/auth", permanent: false },
    }

  return {
    props: { user: user },
  }
}
