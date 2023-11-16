import { useAtom } from "jotai"
import { useEffect } from "react"
import { userAtom } from "./utils"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Redirect, Route, Switch } from "wouter"
import Login from "./pages/Login"
import Main from "./pages/Main"

const App = () => {
	const [user, setUser] = useAtom(userAtom)
	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})
		return () => {
			setUser(undefined)
		}
	}, [setUser])

	if (user === undefined) {
		return <></>
	}

	if (user === null) {
		return (
			<Switch>
				<Route path="/login" component={Login} />
				<Redirect href="/login" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" component={Main} />
			<Redirect href="/" />
		</Switch>
	)
}

export default App
