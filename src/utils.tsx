import { GoogleAuthProvider, User } from "firebase/auth"
import { atom } from "jotai"
import { Notyf } from "notyf"
import { z } from "zod"

export const googleAuthProvider = new GoogleAuthProvider()
export const notyf = new Notyf()
export const userAtom = atom<User | null | undefined>(undefined)

export const zodUserMetadata = z.object({
	username: z.string(),
	photoURL: z.string().nullable(),
})

export type UserMetadataType = z.infer<typeof zodUserMetadata>

export const usersMetadataAtom = atom<Record<string, UserMetadataType>>({})

export type LeftHeaderNavItemType = "new-message"

export const leftHeaderNavItemCurrentAtom = atom<LeftHeaderNavItemType | null>(
	null,
)

export const zodMessage = z.object({
	text: z.string(),
	date: z.number(),
})

export type MessageType = z.infer<typeof zodMessage>
