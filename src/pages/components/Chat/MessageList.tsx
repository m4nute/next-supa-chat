import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export default function MessageList({ user, id }: any) {
  const supabase = useSupabaseClient();

  async function getMessages() {
    const { data } = await supabase.from("messages").select().eq("chat_id", id);
    return data;
  }
  const { data: messages } = useQuery({
    queryKey: ["getChatMessages"],
    queryFn: getMessages,
  });

  return (
    <ul className="px-10 pt-2">
      {messages?.map((message: any, index: number) => {
        return (
          <li
            key={index}
            className={`mt-3 flex ${
              message.sender_id === user.id && "justify-end"
            }`}
          >
            <div className="flex rounded-xl bg-[#292929] py-1.5 pl-4 pr-2">
              <p className="text-lg opacity-90">{message.content}</p>
              <span className="ml-2 flex flex-col justify-end text-[0.8rem] opacity-80">
                {new Date(message.created_at).toLocaleTimeString("default", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                })}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
