import { GoogleAuthProvider, type User } from "firebase/auth"
import { atom } from "jotai"

export const googleProvider = new GoogleAuthProvider()

export const userAtom = atom<User | null | undefined>(undefined)
