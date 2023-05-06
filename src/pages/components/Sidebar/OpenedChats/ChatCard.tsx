import useStore from "~/zustand/globalState"

export default function ChatCard({ index, chat }: { index: number; chat: any }) {
  const [selectedChat, setSelectedChat, setSelectedUser] = useStore((state) => [state.selectedChat, state.setSelectedChat, state.setSelectedUser])

  return (
    <button
      key={index}
      className={`w-full ${index === 0 ? "border-t" : "border-y"} border-gray-600 px-3 py-2 text-sm ${selectedChat === chat.chatId && "bg-message"}`}
      onClick={() => {
        setSelectedChat(chat.chatId)
        setSelectedUser(chat.user)
      }}>
      {chat.user.email.split("@")[0]}
    </button>
  )
}
