import type { zodUser } from "@/model"
import { GoogleAuthProvider, type User } from "firebase/auth"
import { atom } from "jotai"
import type { z } from "zod"

export const googleProvider = new GoogleAuthProvider()
export const userAtom = atom<User | null | undefined>(undefined)
export const usersAtom = atom<Record<string, z.infer<typeof zodUser>>>({})
