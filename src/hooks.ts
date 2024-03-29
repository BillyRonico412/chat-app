import { usersAtom } from "@/store"
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { useRoute } from "wouter"

export const useReceivedUser = () => {
	const [match, params] = useRoute("/messages/:uid")
	const users = useAtomValue(usersAtom)
	const receivedUser = useMemo(() => {
		if (!match) {
			return
		}
		const receivedUser = users[params.uid]
		if (!receivedUser) {
			return
		}
		return receivedUser
	}, [users, params, match])
	return receivedUser
}
