import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { IconBrandTelegram } from '@tabler/icons-react';

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
      <div className="w-full bg-[#262930] h-16 px-4 flex flex-col justify-center border-b border-gray-700">
        <h1 className="text-xl">{receiver.username}</h1>
      </div>
      <ul className="px-10 pt-2">
        {messages?.map((message: any, index: number) => {
          return <li key={index} className="bg-[#292929] py-1.5 pl-4 pr-2 rounded-xl mt-2 inline-flex">
            {/* <h6 className="text-blue-400">{receiver}</h6> */}
            <p className="text-lg opacity-90">{message.content}</p>
            <span className="text-[0.8rem] flex flex-col justify-end ml-3 opacity-80">
              {new Date(message.created_at).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}
            </span>
          </li>;
        })}
      </ul>
      <form onSubmit={handleSubmit(submitData)} className="w-4/5 py-2 px-4 h-16 bg-[#262930] border-t border-gray-700 flex fixed bottom-0 right-0">
        <input
          type="text"
          placeholder="Message"
          {...register("message")}
          className="bg-[#1c1c1c] px-4 rounded-lg h-12 w-full"
        />
        <button type="submit" className="text-center ml-4"><IconBrandTelegram size={24} className="stroke-1 hover:stroke-2 hover:opacity-80 transition-all" /></button>

        <br />
        {errors.message && (
          <span className="text-red-500">{errors.message.message}</span>
        )}
      </form>
    </div>
  );
}
