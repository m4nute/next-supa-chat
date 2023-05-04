import { type ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { IconBrandTelegram } from '@tabler/icons-react';
import * as Avatar from "@radix-ui/react-avatar";

export default function Chat({ id, receiver }: { id: number; receiver: any; }) {
  type formData = {
    message: string;
  };
  const supabase = useSupabaseClient()
  const user = useUser()
  const schema: ZodType<formData> = z.object({
    message: z.string().min(1).max(500),
  })

  async function getMessages() {
    const { data } = await supabase.from("messages").select();
    return data
  }

  const { data: messages } = useQuery({
    queryKey: ["getChatMessages"],
    queryFn: getMessages,
  })

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
      <div className="w-full bg-[#262930] h-16 px-4  border-b border-gray-700 flex">
        <Avatar.Root className="h-[2.5rem] w-[2.5rem] select-none items-center  overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={receiver?.avatar_url}
            alt="Profile Picture"
          />
          <Avatar.Fallback className="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
            {receiver?.email?.slice(0, 2)}
          </Avatar.Fallback>

        </Avatar.Root>
        <h1 className="text-xl flex flex-col justify-center">{receiver.username ? receiver.username : receiver.email}</h1>
      </div>
      <ul className="px-10 pt-2">
        {messages?.map((message: any, index: number) => {
          return <li key={index} className={`mt-3 flex ${message.sender_id === user?.id && 'justify-end'}`}>
            <div className="flex bg-[#292929] py-1.5 pl-4 pr-2 rounded-xl">
              <p className="text-lg opacity-90">{message.content}</p>
              <span className="text-[0.8rem] flex flex-col justify-end ml-2 opacity-80">
                {new Date(message.created_at).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}
              </span>
            </div>
          </li>;
        })}
      </ul>
      <form onSubmit={handleSubmit(submitData)} className="w-4/5 py-2 px-4 h-16 bg-[#262930] border-t border-gray-700 flex fixed bottom-0 right-0">
        <input
          type="text"
          placeholder="Message"
          {...register("message")}
          className="bg-[#1c1c1c] px-4 rounded-lg h-12 w-full"
          autoComplete="off"
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
