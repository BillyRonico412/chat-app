import { InputMessage } from "@/components/InputMessage"
import { MessageItem } from "@/components/MessageItem"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useReceivedUser } from "@/hooks"
import { zodMessage, type zodTypeMessage } from "@/model"
import { userAtom } from "@/store"
import { getDatabase, off, onChildAdded, ref } from "firebase/database"
import { useAtomValue } from "jotai"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import type { z } from "zod"

interface MessagesByUserProps {
	receiverUserUid: string
}

export type MessageItemType = z.infer<typeof zodMessage> & {
	key: string
	type: z.infer<typeof zodTypeMessage>
}

export const MessagesByUser = (props: MessagesByUserProps) => {
	const user = useAtomValue(userAtom)
	const [messages, setMessages] = useState<MessageItemType[]>([])
	const messagesSorted = useMemo(
		() => messages.sort((a, b) => a.date - b.date),
		[messages],
	)
	const receivedUser = useReceivedUser()
	useEffect(() => {
		if (!user) {
			return
		}
		const db = getDatabase()
		const messagesSentRef = ref(
			db,
			`messages/${user.uid}/${props.receiverUserUid}`,
		)
		const messagesReceivedRef = ref(
			db,
			`messages/${props.receiverUserUid}/${user.uid}`,
		)
		for (const [messagesRef, type] of [
			[messagesSentRef, "sent"],
			[messagesReceivedRef, "received"],
		] as const) {
			onChildAdded(messagesRef, (snapshot) => {
				const snapshotVal = snapshot.val()
				const key = snapshot.key
				if (!key) {
					console.error("No key in snapshot")
					toast.error("No key in snapshot")
					return
				}
				const messageSafeParsed = zodMessage.safeParse(snapshotVal)
				if (!messageSafeParsed.success) {
					console.error(messageSafeParsed.error)
					toast.error("Failed to parse message", {
						description: messageSafeParsed.error.message,
					})
					return
				}
				setMessages((prevMessages) => [
					...prevMessages,
					{ ...messageSafeParsed.data, type, key },
				])
			})
		}
		return () => {
			off(messagesSentRef)
			off(messagesReceivedRef)
			setMessages([])
		}
	}, [props.receiverUserUid, user])
	if (!receivedUser) {
		return <></>
	}
	return (
		<div className="h-full w-full flex flex-grow flex-col py-4 gap-y-4">
			<div className="flex-grow flex flex-col">
				<ScrollArea className="mt-auto">
					<div className="container flex flex-col gap-y-2">
						{messagesSorted.map((message) => (
							<MessageItem key={message.key} message={message} />
						))}
					</div>
				</ScrollArea>
			</div>
			<div className="container">
				<InputMessage receiverUserUid={props.receiverUserUid} />
			</div>
		</div>
	)
}
