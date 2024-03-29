import { Header } from "@/components/Header"
import { MessagesByUser } from "@/pages/MessagesByUser"
import { useAtomValue } from "jotai"
import { Redirect, Route, Switch } from "wouter"
import { Separator } from "./components/ui/separator"
import { Login } from "./pages/Login"
import { Messages } from "./pages/Messages"
import { userAtom } from "./store"

export const App = () => {
	const user = useAtomValue(userAtom)

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
		<div className="min-h-[100dvh] flex flex-col">
			<div className="bg-muted">
				<Header />
			</div>
			<Separator />
			<Switch>
				<Route
					path="/messages/:uid"
					component={({ params }) => {
						return <MessagesByUser receiverUserUid={params.uid} />
					}}
				/>
				<Route path="/messages" component={Messages} />
				<Redirect to="/messages" />
			</Switch>
		</div>
	)
}
