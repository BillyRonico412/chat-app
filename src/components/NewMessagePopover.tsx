import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { usersAtom } from "@/store"
import { useAtomValue } from "jotai"
import { MessageCirclePlus } from "lucide-react"

export const NewMessagePopover = () => {
	const users = useAtomValue(usersAtom)
	return (
		<Popover>
			<PopoverTrigger asChild={true}>
				<Button>
					<MessageCirclePlus size={16} className="mr-2" />
					New message
				</Button>
			</PopoverTrigger>
			<PopoverContent asChild={true}>
				<ScrollArea className="flex flex-col gap-y-2 max-h-[400px]">
					{Object.entries(users).map(([uid, user], i) => (
						<>
							{i > 0 && <Separator />}
							<div
								key={uid}
								className="px-4 flex flex-row items-center gap-x-4 cursor-pointer hover:bg-primary/10 rounded-md py-2 transition-colors"
							>
								<Avatar className="scale-0.5">
									<AvatarImage src={user.photoURL ?? ""} />
									<AvatarFallback>{user.userName?.[0]}</AvatarFallback>
								</Avatar>
								{user.userName}
							</div>
						</>
					))}
				</ScrollArea>
			</PopoverContent>
		</Popover>
	)
}
