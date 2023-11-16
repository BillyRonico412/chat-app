import { getDatabase, onValue, ref } from "firebase/database"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { notyf, usersMetadataAtom, zodUserMetadata } from "../utils"
import { z } from "zod"

const UserList = () => {
	const [usersMetadata, setUsersMetadata] = useAtom(usersMetadataAtom)
	console.log(usersMetadata)
	useEffect(() => {
		const db = getDatabase()
		const usersMetadataRef = ref(db, "usersMetadata")
		onValue(usersMetadataRef, (snapshot) => {
			if (!snapshot.exists()) {
				console.error("usersMetadata doesn't exist")
				notyf.error("Failed to fetch users metadata")
				return
			}
			const usersMetadataByDB = snapshot.val()
			const usersMetadataParse = z
				.record(zodUserMetadata)
				.safeParse(usersMetadataByDB)
			if (!usersMetadataParse.success) {
				console.error(usersMetadataParse.error)
				notyf.error("Failed to parse users metadata")
				return
			}
			const usersMetadata = usersMetadataParse.data
			setUsersMetadata(usersMetadata)
		})
	}, [setUsersMetadata])
	return <div>UserList</div>
}

export default UserList
