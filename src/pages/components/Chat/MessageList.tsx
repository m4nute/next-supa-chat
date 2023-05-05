import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function MessageList({ user, id }: any) {
  const supabase = useSupabaseClient();

  async function getMessages() {
    const { data } = await supabase.from("messages").select().eq("chat_id", id);
    return data;
  }
  const { data: messages, refetch } = useQuery({
    queryKey: ["getChatMessages", id],
    queryFn: getMessages,
  });

  useEffect(() => {
    const channel = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chats",
          filter: `id=eq.${id}`,
        },
        () => refetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

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
