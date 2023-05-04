import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export default function Chat({ id, receiver }: { id: number; receiver: any; }) {
  type formData = {
    message: string;
  };

  const supabase = useSupabaseClient();

  const user = useUser();
  const schema: ZodType<formData> = z.object({
    message: z.string().min(1).max(500),
  });

  async function getMessages() {
    const { data } = await supabase.from("messages").select();
    return data;
  }

  const { data: messages } = useQuery({
    queryKey: ["getChatMessages"],
    queryFn: getMessages,
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
  };

  return (
    <div className="w-4/5">
      <h1>{receiver}</h1>
      <ul>
        {messages?.map((message: any, index: number) => {
          return <li key={index}>{message.content}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit(submitData)} className="w-full">
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
    </div>
  );
}
