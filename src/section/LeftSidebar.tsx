import { useAtomValue } from "jotai"
import HeaderWithBack from "../components/HeaderWithBack"
import { leftHeaderNavItemCurrentAtom } from "../utils"
import LeftHeader from "./LeftSidebar/LeftHeader"
import MessageList from "./LeftSidebar/MessageList"
import UserList from "./UserList"

const LeftSidebar = () => {
	const leftHeaderNavItemCurrent = useAtomValue(leftHeaderNavItemCurrentAtom)
	switch (leftHeaderNavItemCurrent) {
		case "new-message":
			return (
				<div className="grid grid-rows-[60px_1fr]">
					<HeaderWithBack title="New message" />
					<UserList />
				</div>
			)
		case null:
			return (
				<div className="grid grid-rows-[60px_1fr]">
					<LeftHeader />
					<MessageList />
				</div>
			)
	}
}

export default LeftSidebar
