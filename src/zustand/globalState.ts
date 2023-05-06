import { create } from "zustand"

type Store = {
  selectedChat: number | null
  selectedUser: { avatar_url: string | null; email: string } | null
}

type Setters = {
  setSelectedChat: (chatId: number) => void
  setSelectedUser: (user: { email: string; avatar_url: string | null }) => void
  reset: () => void
}

const initialState: Store = {
  selectedChat: null,
  selectedUser: null,
}

const useStore = create<Store & Setters>()((set) => ({
  ...initialState,
  setSelectedChat: (chatId: number) => set(() => ({ selectedChat: chatId })),
  setSelectedUser: (user: { avatar_url: string | null; email: string }) => set(() => ({ selectedUser: user })),
  reset: () => set(() => initialState),
}))

export default useStore
