import { useState } from "react";
import Chat from "./components/Chat/ChatMain";
import Sidebar from "./components/Sidebar/SidebarMain";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [selectedChat, setSelectedChat] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<any>();

  return (
    <div className="flex h-full">
      <Sidebar
        setSelectedChat={setSelectedChat}
        setSelectedUser={setSelectedUser}
        selectedChat={selectedChat}
      />
      {selectedChat ? (
        <Chat id={selectedChat} receiver={selectedUser} />
      ) : (
        <h1 className="mt-6 w-4/5 text-center">Select a Chat!</h1>
      )}
    </div>
  );
};

export default Home;
