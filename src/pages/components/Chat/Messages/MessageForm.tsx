import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconBrandTelegram } from "@tabler/icons-react";
import useStore from "~/zustand/globalState";

export default function MessageForm({ user }: any) {
  const selectedChat = useStore((state) => state.selectedChat);

  type formData = {
    message: string;
  };
  const supabase = useSupabaseClient();
  const schema: ZodType<formData> = z.object({
    message: z.string().min(1).max(500),
  });

  const { register, handleSubmit, reset } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const submitData = async ({ message }: formData) => {
    await supabase
      .from("messages")
      .insert({ sender_id: user?.id, chat_id: selectedChat, content: message });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="fixed bottom-0 right-0 flex h-16 w-4/5 border-t border-gray-700 bg-topbar px-4 py-2"
    >
      <input
        type="text"
        placeholder="Message"
        {...register("message")}
        className="h-12 w-full rounded-lg bg-input px-4"
        autoComplete="off"
      />
      <button type="submit" className="ml-4 text-center">
        <IconBrandTelegram
          size={24}
          className="stroke-1 transition-all hover:stroke-2 hover:opacity-80"
        />
      </button>
    </form>
  );
}