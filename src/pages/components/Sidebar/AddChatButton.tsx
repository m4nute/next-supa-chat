import * as Dialog from "@radix-ui/react-dialog";

export default function AddChatButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="mx-2 justify-center bg-[#1c1c1c] text-2xl transition-all hover:text-green-400">
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 " />
        <Dialog.Content className="fadeIn fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2c2c2c] p-[25px] text-white">
          <Dialog.Title className="m-0 text-[17px]">Add User</Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px]">
            Introduce the users email to connect!
          </Dialog.Description>

          <fieldset className="mb-[15px] flex items-center gap-5">
            <label className="w-[90px] text-right text-[15px]" htmlFor="email">
              Email
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] border border-gray-700 bg-[#1f1f1f] px-[10px] text-[15px] text-white "
              id="email"
              placeholder="example@gmail.com"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-[#1f1f1f] px-[15px] transition-all hover:bg-[#4f4f4f]">
                Save changes
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
