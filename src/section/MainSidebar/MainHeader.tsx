import { LuMoreVertical, LuSearch } from "react-icons/lu"
import NavItem from "../../components/NavItem"

const MainHeader = () => {
	return (
		<div className="bg-gray-100 px-2 flex items-center">
			<div className="ml-auto flex items-center">
				<NavItem icon={<LuSearch />} title="Search" />
				<NavItem icon={<LuMoreVertical />} title="Options" />
			</div>
		</div>
	)
}

export default MainHeader
