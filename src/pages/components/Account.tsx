import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  console.log(user);

  return (
    <div className="form-widget">
      <label htmlFor="email">Email</label>
      <input
        className="w-[20rem] border border-gray-600 bg-[#1c1c1c]"
        id="email"
        type="text"
        value={session.user.email}
        disabled
      />
      <br />
      <label htmlFor="username">Id</label>
      <input
        className="w-[25rem] border border-gray-600 bg-[#1c1c1c]"
        placeholder="Username"
        id="username"
        type="text"
        value={session.user.id}
        disabled
      />

      <button className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
}
