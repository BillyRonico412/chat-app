import { GoogleAuthProvider, User } from "firebase/auth"
import { atom } from "jotai"
import { Notyf } from "notyf"

export const googleAuthProvider = new GoogleAuthProvider()
export const notyf = new Notyf()
export const userAtom = atom<User | null | undefined>(undefined)
