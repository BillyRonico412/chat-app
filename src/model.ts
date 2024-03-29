import { z } from "zod"

export const zodUser = z.object({
	userName: z.string(),
	photoURL: z.string().nullable(),
})
