import Chat from "./components/Chat/ChatMain"
import Sidebar from "./components/Sidebar/SidebarMain"
import { GetServerSidePropsContext } from "next"
import { User, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useWindowWidth } from "@react-hook/window-size"
import useStore from "~/zustand/globalState"
import { useLayoutEffect, useState } from "react"

const Home = ({ user }: { user: User | null }) => {
  const [selectedChat] = useStore((state) => [state.selectedChat])
  const [mounted, setMounted] = useState(false)
  const onlyWidth = useWindowWidth({ wait: 10 })

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true)
    }
  }, [])

  if (mounted)
    return (
      <div className="flex h-full">
        {onlyWidth > 640 ? (
          <>
            <Sidebar user={user} />
            <Chat user={user} />
          </>
        ) : selectedChat ? (
          <Chat user={user} />
        ) : (
          <Sidebar user={user} />
        )}
      </div>
    )
  return <></>
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
