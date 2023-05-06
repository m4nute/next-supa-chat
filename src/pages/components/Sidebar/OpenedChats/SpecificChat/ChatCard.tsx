import UserAvatar from "~/pages/components/UserAvatar"
import useStore from "~/zustand/globalState"

export default function ChatCard({ index, chat }: { index: number; chat: any }) {
  const [selectedChat, setSelectedChat, setSelectedUser] = useStore((state) => [state.selectedChat, state.setSelectedChat, state.setSelectedUser])

  console.log(selectedChat == chat.chatId)

  return (
    <button
      key={index}
      className={`w-full rounded-xl flex border-gray-600 h-[3.4rem] px-3 py-2 transition-all  ${selectedChat == chat.chatId ? "bg-message" : "bg-rootBg"}`}
      onClick={() => {
        setSelectedChat(chat.chatId)
        setSelectedUser(chat.user)
      }}>
      <UserAvatar avatarUrl={chat.user.avatar_url} email={chat.user.email} />
      <h1 className="flex flex-col justify-center ml-2">{chat.user.email.split("@")[0]}</h1>
    </button>
  )
}
