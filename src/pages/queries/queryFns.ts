import { SupabaseClient } from "@supabase/auth-helpers-nextjs"

export const getActiveChats = async (userId: number, supabase: SupabaseClient<any, "public", any>) => {
  const { data: chatIds } = await supabase.from("chat_users").select("chat_id").eq("user_id", userId)

  const { data: userList } = await supabase
    .from("chat_users")
    .select("profiles (avatar_url, email)")
    .neq("user_id", userId)
    .in(
      "chat_id",
      // @ts-ignore
      chatIds?.map(({ chat_id }) => chat_id)
    )

  return chatIds?.map((chat, index) => ({
    chatId: chat.chat_id,
    user: userList?.[index]?.profiles,
  }))
}
