import { create } from "zustand";

const useStore = create((set) => ({
  selectedChat: null,
  selectedUser: null,
  setSelectedChat: (chatId: number) => set(() => ({ selectedChat: chatId })),
  setSelectedUser: (user: any) => set(() => ({ selectedUser: user })),
}));

export default useStore;
