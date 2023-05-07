import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { IconBrandTelegram } from "@tabler/icons-react"
import useStore from "~/zustand/globalState"
import { addMessageSchema } from "~/schemas/schemas"
import { insertMessage } from "~/queries/allQueries"

export default function MessageForm({ user }: any) {
  const selectedChat = useStore((state) => state.selectedChat)
  const supabase = useSupabaseClient()

  const { register, handleSubmit, reset } = useForm<messageForm>({
    resolver: zodResolver(addMessageSchema),
  })

  const submitData = async ({ message }: messageForm) => {
    await insertMessage(supabase, user?.id, selectedChat, message)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submitData)} className=" flex h-20 w-full px-4 py-4">
      <input type="text" placeholder="Message" {...register("message")} className="h-12 w-full rounded-lg bg-input px-4" autoComplete="off" />
      <button type="submit" className="ml-4 text-center">
        <IconBrandTelegram size={24} className="stroke-1 transition-all hover:stroke-2 hover:opacity-80" />
      </button>
    </form>
  )
}
