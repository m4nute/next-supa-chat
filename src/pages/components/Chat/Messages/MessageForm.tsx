import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { IconBrandTelegram } from "@tabler/icons-react"
import useStore from "~/zustand/globalState"
import { useEffect } from "react"
import { updateLastViewed } from "~/queries/allQueries"
import { addChatSchema } from "~/schemas/schemas"

export default function MessageForm({ user }: any) {
  const selectedChat = useStore((state) => state.selectedChat)
  const supabase = useSupabaseClient()

  const { register, handleSubmit, reset } = useForm<messageForm>({
    resolver: zodResolver(addChatSchema),
  })

  const submitData = async ({ message }: messageForm) => {
    await supabase.from("messages").insert({ sender_id: user?.id, chat_id: selectedChat, content: message })
    reset()
  }

  useEffect(() => {
    console.log("cargo")
    updateLastViewed(supabase, selectedChat, user?.id, true)
    return () => {
      updateLastViewed(supabase, selectedChat, user?.id)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(submitData)} className=" flex h-20 w-full px-4 py-4">
      <input type="text" placeholder="Message" {...register("message")} className="h-12 w-full rounded-lg bg-input px-4" autoComplete="off" />
      <button type="submit" className="ml-4 text-center">
        <IconBrandTelegram size={24} className="stroke-1 transition-all hover:stroke-2 hover:opacity-80" />
      </button>
    </form>
  )
}
