import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import useStore from "~/zustand/globalState"

export default function SuccessAuth() {
  const supabase = useSupabaseClient()
  const [reset] = useStore((state) => [state.reset])

  return (
    <div className="pt-10 text-center">
      <h1 className="mb-4">Logged In Successfully!</h1>
      <Link href="/" className="rounded-xl bg-message px-4 py-3 transition-all hover:bg-dialogInput">
        Start Chatting
      </Link>
      <button
        className="ml-6 rounded-xl bg-message px-4 py-3 transition-all hover:bg-dialogInput"
        onClick={() => {
          supabase.auth.signOut()
          reset()
        }}>
        Logout
      </button>
    </div>
  )
}
