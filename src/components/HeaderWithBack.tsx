import { LuArrowLeft } from "react-icons/lu"
import NavItem from "./NavItem"
import { useSetAtom } from "jotai"
import { leftHeaderNavItemCurrentAtom } from "../utils"

interface HeaderWithBackProps {
	title: string
}

const HeaderWithBack = (props: HeaderWithBackProps) => {
	const setLeftHeaderNavItemCurrent = useSetAtom(leftHeaderNavItemCurrentAtom)
	return (
		<nav className="bg-gray-100 px-2 flex items-center">
			<NavItem
				icon={<LuArrowLeft />}
				title={props.title}
				onClick={() => {
					setLeftHeaderNavItemCurrent(null)
				}}
			/>
			<p className="font-semibold">{props.title}</p>
		</nav>
	)
}

export default HeaderWithBack
