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
			<div className="text-2xl font-black title-1">
				{receivedUser ? (
					<div className="flex items-center gap-x-4">
						<p className="text-lg font-bold">{receivedUser.userName}</p>
						<Avatar>
							<AvatarImage src={receivedUser.photoURL ?? ""} />
							<AvatarFallback>{receivedUser.userName?.[0]}</AvatarFallback>
						</Avatar>
					</div>
				) : (
					"Chat App"
				)}
			</div>
			<div className="ml-auto flex items-center gap-x-4">
				<Button onClick={() => setLocation("/messages")}>
					<MessagesSquare size={16} className="mr-2" />
					List messages
				</Button>
				<NewMessagePopover />
				<Button onClick={onClickLogOut}>
					<LogOut size={16} className="mr-2" />
					Log out
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
