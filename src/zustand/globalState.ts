import { create } from "zustand";

type Store = {
  selectedChat: number | null;
  selectedUser: any;
};

type Setters = {
  setSelectedChat: (chatId: number) => void;
  setSelectedUser: (user: any) => void;
};

const useStore = create<Store & Setters>((set) => ({
  selectedChat: null,
  selectedUser: null,
  setSelectedChat: (chatId: number) => set(() => ({ selectedChat: chatId })),
  setSelectedUser: (user: any) => set(() => ({ selectedUser: user })),
}));

export default useStore;
