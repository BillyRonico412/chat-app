import { Button } from "@radix-ui/themes"
import to from "await-to-js"
import { getAuth } from "firebase/auth"
import { useCallback } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { notyf } from "../utils"

const Settings = () => {
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
	return (
		<div className="py-8">
			<Button size="2" onClick={onClickDisconnect}>
				Disconnect <FaSignOutAlt />
			</Button>
		</div>
	)
}

export default Settings
