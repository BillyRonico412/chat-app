import to from "await-to-js"
import { getAuth, signInWithPopup } from "firebase/auth"
import { useCallback } from "react"
import { toast } from "sonner"
import { Button } from "../components/ui/button"
import { googleProvider } from "../utils"

export const Login = () => {
	const onClick = useCallback(async () => {
		const auth = getAuth()
		const [errSignIn] = await to(signInWithPopup(auth, googleProvider))
		if (errSignIn) {
			toast.error("Failed to sign in", {
				description: errSignIn.message,
			})
			return
		}
		toast.success("Successfully signed in")
	}, [])
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<Button className="flex items-center gap-x-4" onClick={onClick}>
				Login with Google
			</Button>
		</div>
	)
}
