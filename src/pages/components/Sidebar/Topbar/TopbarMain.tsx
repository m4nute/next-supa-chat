import { User } from "@supabase/auth-helpers-nextjs"
import UserAvatar from "../../UserAvatar"
import LogoutDialog from "./LogoutDialog"

export default function Topbar({ user }: { user: User | null }) {
  return (
    <div className=" flex h-16 justify-between bg-input px-2">
      <div className="flex">
        <UserAvatar avatarUrl={user?.user_metadata.avatar_url} email={user?.email} />
        <h1 className="ml-2 flex flex-col justify-center font-bold">{user?.email?.split("@")[0]}</h1>
      </div>
      <LogoutDialog />
    </div>
  )
}
