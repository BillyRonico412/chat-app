import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom } from "jotai"
import { LogOut, MessageCirclePlus } from "lucide-react"
import { useCallback, useEffect } from "react"
import { Redirect, Route, Switch } from "wouter"
import { Button } from "./components/ui/button"
import { ModeToggle } from "./components/ui/mode-toggle"
import { Separator } from "./components/ui/separator"
import { Login } from "./pages/Login"
import { Messages } from "./pages/Messages"
import { userAtom } from "./utils"
import { getDatabase, ref, set } from "firebase/database"
import to from "await-to-js"
import { toast } from "sonner"

export const App = () => {
	const [user, setUser] = useAtom(userAtom)
	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, async (user) => {
			const db = getDatabase()
			if (user) {
				const userRefInfo = ref(db, `users/${user.uid}/info`)
				const [errSet] = await to(
					set(userRefInfo, {
						userName: user.displayName,
						photoURL: user.photoURL,
					}),
				)
				if (errSet) {
					console.error(errSet)
					toast.error("Failed to set user info", {
						description: errSet.message,
					})
					return
				}
			}
			setUser(user)
		})
	}, [setUser])
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
					<Popover>
						<PopoverTrigger asChild={true}>
							<Button>
								<MessageCirclePlus size={16} className="mr-2" />
								New message
							</Button>
						</PopoverTrigger>
						<PopoverContent>Hello world</PopoverContent>
					</Popover>
					<Button onClick={onClickLogOut}>
						<LogOut size={16} className="mr-2" />
						Log out
					</Button>
					<ModeToggle />
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
