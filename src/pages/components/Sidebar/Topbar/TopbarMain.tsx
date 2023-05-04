import * as Avatar from "@radix-ui/react-avatar";
import LogoutDialog from "./LogoutDialog";

export default function Topbar({ user }: { user: any }) {

    return (
        <div className=" px-2 flex h-16 bg-[#262930] justify-between">
            <div className="flex">
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
                <h1 className="ml-2 flex flex-col justify-center">{user?.user_metadata.name ? user?.user_metadata.name : user?.email}</h1>
            </div>
            <LogoutDialog />
        </div>
    )
}
