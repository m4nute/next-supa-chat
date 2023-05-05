import useStore from "~/zustand/globalState";
import UserAvatar from "../UserAvatar";

export default function ChatTopbar() {
  const selectedUser = useStore((state) => [state.selectedUser]);

  return (
    <div className="flex h-16 w-full border-b  border-gray-700 bg-[#262930] px-4">
      <div className="flex flex-col justify-center">
        <UserAvatar
          avatarUrl={selectedUser?.[0]?.avatar_url}
          email={selectedUser?.[0]?.email}
        />
      </div>
      <h1 className="ml-2 flex flex-col justify-center">
        {selectedUser?.[0]?.email}
      </h1>
    </div>
  );
}
