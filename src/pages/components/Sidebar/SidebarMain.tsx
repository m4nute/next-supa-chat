import { useState } from "react"
import Topbar from "./Topbar/TopbarMain"
import SearchBar from "./OpenedChats/SearchBar"
import AddChatButton from "./OpenedChats/AddChatButton/AddChatButtonMain"
import OpenedChats from "./OpenedChats/OpenedChatsMain"
import { User } from "@supabase/auth-helpers-nextjs"

export default function Sidebar({ user }: { user: User | null }) {
  const [filterText, setFilterText] = useState<string>("")

  return (
    <div className="min-h-full w-1/5 border-r border-gray-700 bg-input">
      <Topbar user={user} />
      <div className="my-3 flex">
        <SearchBar filterText={filterText} setFilterText={setFilterText} />
        <AddChatButton />
      </div>
      <OpenedChats user={user} filterText={filterText} />
    </div>
  )
}
