import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { Redirect, Route, Switch } from "wouter"
import { Login } from "./pages/Login"
import { Messages } from "./pages/Messages"
import { userAtom } from "./utils"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"

export const App = () => {
	const [user, setUser] = useAtom(userAtom)
	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})
	}, [setUser])
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
				<a href="/" className="text-2xl font-bold title">
					Chat App
				</a>
				<Button className="ml-auto">Log out</Button>
			</nav>
			<Separator />
			<Switch>
				<Route path="/messages" component={Messages} />
				<Redirect to="/messages" />
			</Switch>
		</div>
	)
}
