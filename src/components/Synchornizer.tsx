import { zodUser } from "@/model"
import { userAtom, usersAtom } from "@/store"
import to from "await-to-js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, onValue, ref, set } from "firebase/database"
import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { toast } from "sonner"
import { z } from "zod"

export const Synchornizer = () => {
	const [user, setUser] = useAtom(userAtom)
	const setUsers = useSetAtom(usersAtom)
	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			const db = getDatabase()
			if (user?.displayName) {
				const userRefInfo = ref(db, `users/${user.uid}`)
				const [errSet] = await to(
					set(userRefInfo, {
						userName: user.displayName,
						photoURL: user.photoURL,
					} satisfies z.infer<typeof zodUser>),
				)
				if (errSet) {
					console.error(errSet)
					toast.error("Failed to set user info", {
						description: errSet.message,
					})
				}
			}
			setUser(user)
		})
	}, [setUser])

	useEffect(() => {
		if (!user) {
			setUsers({})
			return
		}
		const db = getDatabase()
		const usersRef = ref(db, "users")
		onValue(usersRef, (snapshot) => {
			const snapshotVal = snapshot.val()
			const usersSafeParsed = z.record(zodUser).safeParse(snapshotVal)
			if (!usersSafeParsed.success) {
				console.error(usersSafeParsed.error)
				toast.error("Failed to parse users", {
					description: usersSafeParsed.error.message,
				})
				return
			}
			setUsers(usersSafeParsed.data)
		})
	}, [setUsers, user])

	return <></>
}
