import { ZodType, z } from "zod"

export const addChatSchema: ZodType<addChatForm> = z.object({
  email: z.string().email(),
})
