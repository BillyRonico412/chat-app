import { NewMessagePopover } from "@/components/NewMessagePopover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useReceivedUser } from "@/hooks"
import { userAtom } from "@/store"
import to from "await-to-js"
import { getAuth } from "firebase/auth"
import { useAtomValue } from "jotai"
import { LogOut, MessagesSquare } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"
import { useLocation } from "wouter"

export const Header = () => {
	const [, setLocation] = useLocation()
	const receivedUser = useReceivedUser()
	const user = useAtomValue(userAtom)
	const onClickLogOut = useCallback(async () => {
		const auth = getAuth()
		const [err] = await to(auth.signOut())
		if (err) {
			toast.error("Failed to log out", {
				description: err.message,
			})
			return
		}
		toast.success("Logged out")
	}, [])
	if (!user) {
		return <></>
	}
	return (
		<nav className="flex items-center py-4 container">
			{receivedUser ? (
				<div className="flex items-center gap-x-4">
					<Avatar>
						<AvatarImage src={receivedUser.photoURL ?? ""} />
						<AvatarFallback>{receivedUser.userName?.[0]}</AvatarFallback>
					</Avatar>
				</div>
			) : (
				<div className="text-lg font-black title-1">Chat App</div>
			)}
			<div className="ml-auto flex items-center gap-x-2">
				<Button onClick={() => setLocation("/messages")} size="icon">
					<MessagesSquare size={16} />
				</Button>
				<NewMessagePopover />
				<Button onClick={onClickLogOut} size="icon">
					<LogOut size={16} />
				</Button>
				<ModeToggle />
				<Avatar>
					<AvatarImage src={user.photoURL ?? ""} />
					<AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
				</Avatar>
			</div>
		</nav>
	)
}
