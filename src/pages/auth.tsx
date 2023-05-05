import { Auth } from "@supabase/auth-ui-react";
// @ts-ignore
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

const Home = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  console.log(user);

  if (user) {
    return (
      <div>
        <h1>Logged In</h1>
        <Link href="/">Start Chatting</Link>
      </div>
    );
  }

  return (
    <div className="xl-1/3 mx-auto w-5/6 pt-12 sm:w-4/5 md:w-3/5 lg:w-1/2">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["google"]}
        redirectTo="http://localhost:3000/auth"
      />
    </div>
  );
};

export default Home;
