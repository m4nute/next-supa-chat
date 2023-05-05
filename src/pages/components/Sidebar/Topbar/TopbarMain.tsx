import * as Avatar from "@radix-ui/react-avatar";
import LogoutDialog from "./LogoutDialog";

export default function Topbar({ user }: { user: any }) {
  return (
    <div className=" flex h-16 justify-between bg-[#262930] px-2">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <Avatar.Root className="h-[2.5rem] w-[2.5rem] select-none items-center  overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={user?.user_metadata.avatar_url}
              alt="Profile Picture"
            />
            <Avatar.Fallback className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-black">
              {user?.email?.slice(0, 2)}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
        <h1 className="ml-2 flex flex-col justify-center">
          {user?.user_metadata.name ? user?.user_metadata.name : user?.email}
        </h1>
      </div>
      <LogoutDialog />
    </div>
  );
}
