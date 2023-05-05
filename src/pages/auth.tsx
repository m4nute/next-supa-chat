import { Auth } from "@supabase/auth-ui-react";
// @ts-ignore
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Home = () => {
  const supabase = useSupabaseClient();
  const user = useUser();

  if (user) {
    return (
      <div className="pt-10 text-center">
        <h1>Logged In Successfully!</h1>
        <br />
        <Link
          href="/"
          className="rounded-xl bg-message px-4 py-3 transition-all hover:bg-dialogInput"
        >
          Start Chatting
        </Link>
        <br />
        <button
          className="mt-6 rounded-xl bg-message px-4 py-3 transition-all hover:bg-dialogInput"
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </button>
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
