import * as Dialog from "@radix-ui/react-dialog";
import { type ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function AddChatButton() {
  type formData = {
    email: string;
  };
  const supabase = useSupabaseClient();
  const user = useUser();

  const schema: ZodType<formData> = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const [open, setOpen] = useState<boolean>(false);

  const submitData = async ({ email }: formData) => {
    if (email === user?.email) {
      setError("email", { message: "Own email is invalid" });
      return;
    }

    const { data: matchingUsers } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email);

    if (matchingUsers?.length! == 0) {
      setError("email", { message: "Email not found" });
      return;
    }

    let { data: existentChats } = await supabase
      .from("chat_users")
      .select("chat_id")
      .eq("user_id", user?.id);
    existentChats = existentChats?.map((obj) => obj.chat_id) || [];

    const { data: chatAlreadyCreated } = await supabase
      .from("chat_users")
      .select("user_id")
      .eq("chat_id", existentChats)
      .eq("user_id", matchingUsers?.[0]?.id)
      .neq("user_id", user?.id);

    if (chatAlreadyCreated?.length! > 0) {
      setError("email", { message: "Chat Already Created" });
      return;
    }

    setOpen(false);
    reset();

    const { data: chat } = await supabase.from("chats").insert({}).select();
    await supabase.from("chat_users").insert([
      { chat_id: chat?.[0]?.id, user_id: user?.id },
      { chat_id: chat?.[0]?.id, user_id: matchingUsers?.[0]?.id },
    ]);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setOpen((open) => !open);
        reset();
      }}
    >
      <Dialog.Trigger asChild>
        <button className="mx-2 justify-center bg-input text-2xl transition-all hover:text-green-400">
          +
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 " />
        <Dialog.Content className="fadeIn fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2c2c2c] p-[25px] text-white">
          <Dialog.Title className="m-0 text-[17px] font-bold">
            Add User
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px]">
            Introduce an existing email to connect!
          </Dialog.Description>

          <form onSubmit={handleSubmit(submitData)}>
            <fieldset className="flex items-center gap-5">
              <label
                className="w-[90px] text-right text-[15px]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] border border-gray-700 bg-dialogButton px-[10px] text-[15px] text-white"
                id="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                {...register("email")}
              />
              <button
                type="submit"
                className="rounded-lg bg-dialogButton px-3 py-2 transition-all hover:bg-dialogInput"
              >
                Check
              </button>
            </fieldset>
            {errors.email && (
              <p className="text-center text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
