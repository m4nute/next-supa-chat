import * as Avatar from "@radix-ui/react-avatar";
import useStore from "~/zustand/globalState";

export default function ChatTopbar() {
  const selectedUser = useStore((state) => [state.selectedUser]);

  console.log(selectedUser);
  return (
    <div className="flex h-16 w-full border-b  border-gray-700 bg-[#262930] px-4">
      <div className="flex flex-col justify-center">
        <Avatar.Root className="h-[2.5rem] w-[2.5rem] select-none items-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={selectedUser?.[0]?.avatar_url}
            alt="Profile Picture"
          />
          <Avatar.Fallback className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-black">
            {selectedUser?.[0]?.email?.slice(0, 2)}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <h1 className="ml-2 flex flex-col justify-center">
        {selectedUser?.[0]?.email}
      </h1>
    </div>
  );
}
