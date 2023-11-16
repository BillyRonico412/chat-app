import { Button, Container, Flex } from "@radix-ui/themes"
import { getAuth, signInWithPopup } from "firebase/auth"
import { useCallback } from "react"
import { FaGoogle } from "react-icons/fa"
import { googleAuthProvider, notyf } from "../utils"
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
		const [errSetUserMetadata] = await to(
			set(ref(db, `usersMetadata/${user.uid}`), {
				username: user.displayName,
				photoUrl: user.photoURL,
			}),
		)
		if (errSetUserMetadata) {
			console.error(errSetUserMetadata)
			notyf.error("Failed to set user metadata")
			return
		}
		notyf.success("Connected")
	}, [])
	return (
		<Container>
			<Flex align="center" justify="center" className="h-screen">
				<Button size="4" onClick={onClickConnect}>
					Connect to Google <FaGoogle />
				</Button>
			</Flex>
		</Container>
	)
}

export default Login
