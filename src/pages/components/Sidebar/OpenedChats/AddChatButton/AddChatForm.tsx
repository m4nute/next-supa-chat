import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addChatSchema } from "~/schemas/schemas"
import { createChat, createChatDependencies, getChatWithMatchingUser, getUser, getUserChats } from "~/pages/queries/allQueries"
import { User, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useEffect } from "react"

export default function AddChatForm({ setOpen, open }: { setOpen: (state: boolean) => void; open: boolean }) {
  const user: User | null = useUser()
  const supabase = useSupabaseClient()

  useEffect(() => {
    !open && reset()
  }, [open])

  const submitData = async ({ email }: addChatForm) => {
    if (email === user?.email) {
      setError("email", { message: "Own email is invalid" })
      return
    }

    const { data: matchingUser } = await getUser(supabase, email)
    if (!matchingUser) {
      setError("email", { message: "Email not found" })
      return
    }

    let { data } = await getUserChats(supabase, user?.id)
    const existentChats: number[] | [] = data?.map((chat) => chat.chat_id) || []

    if (existentChats.length) {
      const { data: chatAlreadyCreated } = await getChatWithMatchingUser(supabase, existentChats, matchingUser.id, user?.id)

      if (chatAlreadyCreated) {
        setError("email", { message: "Chat Already Created" })
        return
      }
    }

    setOpen(false)
    reset()

    const { data: chat } = await createChat(supabase)
    createChatDependencies(supabase, chat?.[0]?.id, user?.id, matchingUser.id)
  }

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<addChatForm>({ resolver: zodResolver(addChatSchema) })

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <fieldset className="flex items-center gap-5">
        <label className="w-[90px] text-right text-[15px]" htmlFor="email">
          Email
        </label>
        <input
          className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] border border-gray-700 bg-dialogButton px-[10px] text-[15px] text-white"
          id="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          {...register("email")}
        />
        <button type="submit" className="rounded-lg bg-dialogButton px-3 py-2 transition-all hover:bg-dialogInput">
          Check
        </button>
      </fieldset>
      {errors.email && <p className="text-center text-sm text-red-500">{errors.email.message}</p>}
    </form>
  )
}
