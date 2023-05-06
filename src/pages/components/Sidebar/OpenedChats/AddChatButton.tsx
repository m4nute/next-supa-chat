import * as Dialog from "@radix-ui/react-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { createChat, createChatDependencies, getChatWithMatchingUser, getUser, getUserChats } from "~/pages/queries/allQueries"
import { addChatSchema } from "~/schemas/schemas"

export default function AddChatButton() {
  const supabase = useSupabaseClient()
  const user: User | null = useUser()
  const [open, setOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<addChatForm>({ resolver: zodResolver(addChatSchema) })

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

      if (!chatAlreadyCreated) {
        setError("email", { message: "Chat Already Created" })
        return
      }
    }

    setOpen(false)
    reset()

    const { data: chat } = await createChat(supabase)
    createChatDependencies(supabase, chat?.[0]?.id, user?.id, matchingUser.id)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen((open) => !open)
        reset()
      }}>
      <Dialog.Trigger asChild>
        <button className="mx-2 justify-center bg-input text-2xl transition-all hover:text-green-400">+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 " />
        <Dialog.Content className="fadeIn fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2c2c2c] p-[25px] text-white">
          <Dialog.Title className="m-0 text-[17px] font-bold">Add User</Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px]">Introduce an existing email to connect!</Dialog.Description>

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
