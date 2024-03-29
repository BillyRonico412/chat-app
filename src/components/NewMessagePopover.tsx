import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usersAtom } from "@/store"
import { useAtomValue } from "jotai"
import { MessageCirclePlus } from "lucide-react"
import { useCallback } from "react"
import { useLocation } from "wouter"

export const NewMessagePopover = () => {
	const [, setLocation] = useLocation()
	const users = useAtomValue(usersAtom)
	const onClickUser = useCallback(
		(uid: string) => {
			setLocation(`/messages/${uid}`)
		},
		[setLocation],
	)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild={true}>
				<Button>
					<MessageCirclePlus size={16} className="mr-2" />
					New message
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Object.entries(users).map(([uid, user]) => (
					<DropdownMenuItem
						onClick={() => onClickUser(uid)}
						key={uid}
						className="px-4 flex flex-row items-center gap-x-4 transition-colors"
					>
						<Avatar className="scale-0.5">
							<AvatarImage src={user.photoURL ?? ""} />
							<AvatarFallback>{user.userName?.[0]}</AvatarFallback>
						</Avatar>
						{user.userName}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
