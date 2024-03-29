import { NewMessagePopover } from "@/components/NewMessagePopover"
import to from "await-to-js"
import { getAuth } from "firebase/auth"
import { useAtomValue } from "jotai"
import { LogOut } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"
import { Redirect, Route, Switch } from "wouter"
import { Button } from "./components/ui/button"
import { ModeToggle } from "./components/ui/mode-toggle"
import { Separator } from "./components/ui/separator"
import { Login } from "./pages/Login"
import { Messages } from "./pages/Messages"
import { userAtom } from "./store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const App = () => {
	const user = useAtomValue(userAtom)

	const onClickLogOut = useCallback(async () => {
		const auth = getAuth()
		const [err] = await to(auth.signOut())
		if (err) {
			toast.error("Failed to log out", {
				description: err.message,
			})
			return
		}
		toast.success("Logged out")
	}, [])

	if (user === undefined) {
		return <></>
	}

	if (user === null) {
		return (
			<Switch>
				<Route path="/login" component={Login} />
				<Redirect to="/login" />
			</Switch>
		)
	}

	return (
		<div className="container min-h-screen">
			<nav className="flex items-center py-4">
				<a href="/" className="text-2xl font-black title-1">
					Chat App
				</a>
				<div className="ml-auto flex items-center gap-x-4">
					<NewMessagePopover />
					<Button onClick={onClickLogOut}>
						<LogOut size={16} className="mr-2" />
						Log out
					</Button>
					<ModeToggle />
					<Avatar>
						<AvatarImage src={user.photoURL ?? ""} />
						<AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
					</Avatar>
				</div>
			</nav>
			<Separator />
			<Switch>
				<Route path="/messages" component={Messages} />
				<Redirect to="/messages" />
			</Switch>
		</div>
	)
}
