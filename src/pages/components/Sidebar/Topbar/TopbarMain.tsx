import { User } from "@supabase/auth-helpers-nextjs"
import UserAvatar from "../../UserAvatar"
import LogoutDialog from "./LogoutDialog"

export default function Topbar({ user }: { user: User | null }) {
  return (
    <div className=" flex h-16 justify-between bg-input px-2 w-full">
      <div className="flex w-[calc(100%-1.5rem)]">
        <UserAvatar avatarUrl={user?.user_metadata.avatar_url} email={user?.email} />
        <h1 className="mx-2 flex flex-col justify-center font-bold text-lg text-ellipsis overflow-hidden w-full whitespace-nowrap sm:text-sm md:text-base">{user?.email?.split("@")[0]}</h1>
      </div>
      <LogoutDialog />
    </div>
  )
}
