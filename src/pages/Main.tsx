import MessageList from "../components/MessageList"
import Messages from "../components/Messages"
import Settings from "../components/Settings"
import UserList from "../components/UserList"

const Main = () => {
	return (
		<div className="w-screen h-screen">
			<div className="grid grid-cols-[300px_1fr_300px] h-full">
				<div>
					<MessageList />
				</div>
				<div>
					<Messages />
				</div>
				<div className="h-full flex flex-col px-4 py-4">
					<div className="flex-grow">
						<UserList />
					</div>
					<Settings />
				</div>
			</div>
		</div>
	)
}

export default Main
