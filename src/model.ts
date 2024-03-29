import { z } from "zod"

export const zodUser = z.object({
	userName: z.string(),
	photoURL: z.string().nullable(),
})

export const zodMessage = z.object({
	text: z.string(),
	date: z.number(),
})

export const zodTypeMessage = z.union([
	z.literal("sent"),
	z.literal("received"),
])

export const zodLastMessage = zodMessage.extend({
	type: zodTypeMessage,
})
