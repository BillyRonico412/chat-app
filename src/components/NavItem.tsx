import { ReactNode } from "react"

interface NavItemProps {
	title: string
	icon: ReactNode
	onClick?: () => void
}

const NavItem = (props: NavItemProps) => {
	return (
		<div
			title={props.title}
			className="text-xl cursor-pointer rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-200"
			onClick={props.onClick}
		>
			{props.icon}
		</div>
	)
}

export default NavItem
