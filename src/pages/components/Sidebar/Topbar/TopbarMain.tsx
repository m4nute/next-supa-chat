import UserAvatar from "../../UserAvatar";
import LogoutDialog from "./LogoutDialog";

export default function Topbar({ user }: { user: any }) {
  return (
    <div className=" flex h-16 justify-between bg-[#262930] px-2">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <UserAvatar
            avatarUrl={user?.user_metadata.avatar_url}
            email={user?.email}
          />
        </div>
        <h1 className="ml-2 flex flex-col justify-center">{user?.email}</h1>
      </div>
      <LogoutDialog />
    </div>
  );
}
