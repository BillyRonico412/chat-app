import to from "await-to-js"
import { getAuth } from "firebase/auth"
import { useAtomValue, useSetAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { LuLogOut, LuMessageSquarePlus } from "react-icons/lu"
import NavItem from "../../components/NavItem"
import UserPhoto from "../../components/UserPhoto"
import {
	UserMetadataType,
	leftHeaderNavItemCurrentAtom,
	notyf,
	userAtom,
} from "../../utils"

const LeftHeader = () => {
	const setLeftHeaderNavItemCurrent = useSetAtom(leftHeaderNavItemCurrentAtom)
	const user = useAtomValue(userAtom)
	const userMetadata = useMemo((): UserMetadataType | undefined => {
		if (!user || !user.displayName) {
			return
		}
		return {
			photoURL: user.photoURL,
			username: user.displayName,
		}
	}, [user])

	const onClickDisconnect = useCallback(async () => {
		const auth = getAuth()
		const [err] = await to(auth.signOut())
		if (err) {
			console.error(err)
			notyf.error("Error while disconnecting")
			return
		}
		notyf.success("Disconnected")
	}, [])

	if (!userMetadata) {
		return <></>
	}
	return (
		<nav className="bg-gray-100 px-2 flex items-center">
			<UserPhoto userMetadata={userMetadata} />
			<div className="ml-auto flex items-center">
				<NavItem
					icon={<LuMessageSquarePlus />}
					title="New message"
					onClick={() => setLeftHeaderNavItemCurrent("new-message")}
				/>
				<NavItem
					icon={<LuLogOut />}
					title="Log out"
					onClick={onClickDisconnect}
				/>
			</div>
		</nav>
	)
}

export default LeftHeader
