import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"
import AddChatForm from "./AddChatForm"

export default function AddChatButton() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen((open) => !open)}>
      <Dialog.Trigger asChild>
        <button className="mx-2 justify-center bg-input text-2xl transition-all hover:text-green-400">+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 " />
        <Dialog.Content className="fadeIn fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2c2c2c] p-[25px] text-white">
          <Dialog.Title className="m-0 text-[17px] font-bold">Add User</Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px]">Introduce an existing email to connect!</Dialog.Description>

          <AddChatForm setOpen={setOpen} open={open} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
