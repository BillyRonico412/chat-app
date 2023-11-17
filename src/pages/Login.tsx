import { getAuth, signInWithPopup } from "firebase/auth"
import { useCallback } from "react"
import { FaGoogle } from "react-icons/fa"
import { UserMetadataType, googleAuthProvider, notyf } from "../utils"
import to from "await-to-js"
import { getDatabase, ref, set } from "firebase/database"

const Login = () => {
	const onClickConnect = useCallback(async () => {
		const auth = getAuth()
		const [errSignIn, userCredential] = await to(
			signInWithPopup(auth, googleAuthProvider),
		)
		if (errSignIn) {
			console.error(errSignIn)
			notyf.error("Failed to connect to Google")
			return
		}
		const { user } = userCredential
		const db = getDatabase()

		if (user.displayName === null) {
			console.error("user.displayName is null")
			notyf.error("Your Google account doesn't have a display name")
			return
		}

		const userMetadata: UserMetadataType = {
			username: user.displayName,
			photoURL: user.photoURL,
		}
		const [errSetUserMetadata] = await to(
			set(ref(db, `usersMetadata/${user.uid}`), userMetadata),
		)
		if (errSetUserMetadata) {
			console.error(errSetUserMetadata)
			notyf.error("Failed to set user metadata")
			return
		}
		notyf.success("Connected")
	}, [])
	return (
		<div className="container">
			<div className="flex justify-center items-center h-screen">
				<button onClick={onClickConnect}>
					Connect to Google <FaGoogle />
				</button>
			</div>
		</div>
	)
}

export default Login
