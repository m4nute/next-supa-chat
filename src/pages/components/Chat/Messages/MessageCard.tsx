import { User } from "@supabase/auth-helpers-nextjs"

export default function MessageCard({ message, user }: { user: User | null; message: { sender_id: string; content: string; created_at: Date } }) {
  const ownMessage = message.sender_id === user?.id

  return (
    <li className={`mt-3 flex ${ownMessage && "justify-end"}`}>
      <div className={`${ownMessage ? "bg-message" : "bg-input"} flex rounded-xl py-1.5 pl-4 pr-2`}>
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
  )
}
