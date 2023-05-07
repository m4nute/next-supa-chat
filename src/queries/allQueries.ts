import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { UUID } from "crypto"

type client = SupabaseClient<any, "public", any>

export const getMessages = async (supabase: client, chatId: number | null) => {
  const { data } = await supabase.from("messages").select().eq("chat_id", chatId)
  return data
}

export const insertMessage = async (supabase: client, userId: string | null, chatId: number | null, message: string) => {
  await supabase.from("messages").insert({ sender_id: userId, chat_id: chatId, content: message })
}

export const getActiveChats = async (userId: string | undefined, supabase: client) => {
  const { data: chatIds } = await supabase.from("chat_users").select("chat_id").eq("user_id", userId).order("updated_at", { ascending: false })

  if (!chatIds?.length) return []

  const { data: userList } = await supabase
    .from("chat_users")
    .select("profiles (avatar_url, email)")
    .neq("user_id", userId)
    .in(
      "chat_id",
      chatIds?.map(({ chat_id }) => chat_id)
    )
    .order("updated_at", { ascending: false })

  return chatIds?.map((chat, index) => ({
    chatId: chat.chat_id,
    user: userList?.[index]?.profiles,
  }))
}

export const createChat = async (supabase: client) => {
  return await supabase.from("chats").insert({}).select()
}

export const createChatDependencies = async (supabase: client, chatId: number, userId: string | undefined, receiverId: UUID) => {
  await supabase.from("chat_users").insert([
    { chat_id: chatId, user_id: userId },
    { chat_id: chatId, user_id: receiverId },
  ])
}

export const getUser = async (supabase: client, email: string) => {
  return await supabase.from("profiles").select("id").eq("email", email).single()
}

export const getUserChats = async (supabase: client, userId: string | undefined) => {
  return await supabase.from("chat_users").select("chat_id").eq("user_id", userId)
}

export const getChatWithMatchingUser = async (supabase: client, existentChats: number[] | [], receiverId: UUID, userId: string | undefined) => {
  return await supabase.from("chat_users").select("user_id").eq("chat_id", existentChats).eq("user_id", receiverId).neq("user_id", userId).single()
}
