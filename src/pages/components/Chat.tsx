import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Chat({ id }: { id: number }) {
  type formData = {
    message: string;
  };

  const supabase = useSupabaseClient();

  const user = useUser();
  const schema: ZodType<formData> = z.object({
    message: z.string().min(1).max(500),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const submitData = async ({ message }: formData) => {
    const { error } = await supabase
      .from("messages")
      .insert({ sender_id: user?.id, chat_id: id, content: message });
    reset();
    console.log(error)
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className="w-4/5">
      <input
        type="text"
        placeholder="Send Message"
        {...register("message")}
        className="border bg-[#1c1c1c]"
      />
      <button type="submit">send</button>

      <br />
      {errors.message && (
        <span className="text-red-500">{errors.message.message}</span>
      )}
    </form>
  );
}
