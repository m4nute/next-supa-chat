import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconBrandTelegram } from "@tabler/icons-react";

export default function MessageForm({ user, id }: any) {
  type formData = {
    message: string;
  };
  const supabase = useSupabaseClient();
  const schema: ZodType<formData> = z.object({
    message: z.string().min(1).max(500),
  });

  const { register, handleSubmit, reset, getValues } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const submitData = async ({ message }: formData) => {
    const { error } = await supabase
      .from("messages")
      .insert({ sender_id: user?.id, chat_id: id, content: message });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="fixed bottom-0 right-0 flex h-16 w-4/5 border-t border-gray-700 bg-[#262930] px-4 py-2"
    >
      <input
        type="text"
        placeholder="Message"
        {...register("message")}
        className="h-12 w-full rounded-lg bg-[#1c1c1c] px-4"
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
