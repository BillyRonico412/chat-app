import LeftSidebar from "../section/LeftSidebar"
import MainSidebar from "../section/MainSidebar"

const Main = () => {
	return (
		<div className="container mx-auto h-screen py-8">
			<div className="grid grid-cols-[400px_1fr] h-full border rounded overflow-hidden divide-x">
				<LeftSidebar />
				<MainSidebar />
			</div>
		</div>
	)
}

export default Main
