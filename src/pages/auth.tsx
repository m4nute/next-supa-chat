import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import SuccessAuth from "./components/Auth/SuccessAuth"

export default function Home() {
  const supabase = useSupabaseClient()
  const user = useUser()

  return !user ? (
    <div className="mx-auto w-5/6 pt-12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={["google"]} redirectTo="http://localhost:3000/auth" />
    </div>
  ) : (
    <SuccessAuth />
  )
}
