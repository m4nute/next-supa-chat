import useStore from "~/zustand/globalState"
import UserAvatar from "../UserAvatar"
import { useWindowWidth } from "@react-hook/window-size"
import GoBack from "./GoBack"

export default function ChatTopbar() {
  const [selectedUser] = useStore((state) => [state.selectedUser])

  const onlyWidth = useWindowWidth({ wait: 10 })

  return (
    <div className="flex h-16 w-full  shadow-sm shadow-input bg-input px-4 justify-between">
      <div className="flex">
        <UserAvatar avatarUrl={selectedUser?.avatar_url} email={selectedUser?.email} />
        <h1 className="ml-2 flex flex-col justify-center">{selectedUser?.email}</h1>
      </div>
      {onlyWidth <= 640 && <GoBack />}
    </div>
  )
}
