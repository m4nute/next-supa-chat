import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const supabase = useSupabaseClient();

  return (
    <div>
      <h1>Chats</h1>
      <ul className=""></ul>
    </div>
  );
};

export default Home;
