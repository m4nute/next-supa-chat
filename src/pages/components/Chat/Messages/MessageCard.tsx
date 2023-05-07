import { User } from "@supabase/auth-helpers-nextjs"

export default function MessageCard({ message, user }: { user: User | null; message: { sender_id: string; content: string; created_at: Date } }) {
  const ownMessage = message.sender_id === user?.id
  const formattedTime = new Date(message.created_at).toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
  return (
    <li className={`mt-3 flex ${ownMessage && "justify-end"}`}>
      <div className={`flex w-11/12 ${ownMessage && "justify-end"}`}>
        <div className={`${ownMessage ? "bg-message" : "bg-input"} flex rounded-lg py-1.5 pl-3 pr-1 max-w-full`}>
          <p className="text-base sm:text-sm md:text-base lg:text-lg opacity-90 break-all">{message.content}</p>
          <span className="ml-2 flex flex-col justify-end text-[0.8rem] opacity-80">{formattedTime}</span>
        </div>
      </div>
    </li>
  )
}
