import useStore from "~/zustand/globalState"
import UserAvatar from "../UserAvatar"

export default function ChatTopbar() {
  const [selectedUser] = useStore((state) => [state.selectedUser])

  return (
    <div className="flex h-16 w-full border-b  border-gray-700 bg-topbar px-4">
      <UserAvatar avatarUrl={selectedUser?.avatar_url} email={selectedUser?.email} />
      <h1 className="ml-2 flex flex-col justify-center">{selectedUser?.email}</h1>
    </div>
  )
}
