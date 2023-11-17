import MainHeader from "./MainSidebar/MainHeader"
import Messages from "./MainSidebar/Messages"

const MainSidebar = () => {
	return (
		<div className="grid grid-rows-[60px_1fr]">
			<MainHeader />
			<Messages />
		</div>
	)
}

export default MainSidebar
