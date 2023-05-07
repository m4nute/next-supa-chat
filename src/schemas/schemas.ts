import { ZodType, z } from "zod"

export const addChatSchema: ZodType<addChatForm> = z.object({
  email: z.string().email(),
})

export const addMessageSchema: ZodType<messageForm> = z.object({
  message: z.string().min(1).max(500),
})
