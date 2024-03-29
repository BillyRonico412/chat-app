import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { zodLastMessage, zodMessage } from "@/model"
import { userAtom } from "@/store"
import { getDatabase, push, ref, set } from "firebase/database"
import { useAtomValue } from "jotai"
import { SendHorizonal } from "lucide-react"
import { useCallback, useState } from "react"
import type { z } from "zod"

interface InputMessageProps {
	receiverUserUid: string
}

export const InputMessage = (props: InputMessageProps) => {
	const [text, setText] = useState("")
	const user = useAtomValue(userAtom)
	const onClickSend = useCallback(() => {
		if (!user || !text) {
			return
		}
		const db = getDatabase()
		const messagesRef = ref(db, `messages/${user.uid}/${props.receiverUserUid}`)
		const lastMessageRef1 = ref(
			db,
			`lastMessage/${user.uid}/${props.receiverUserUid}`,
		)
		const lastMessageRef2 = ref(
			db,
			`lastMessage/${props.receiverUserUid}/${user.uid}`,
		)
		const newMessageRef = push(messagesRef)
		const newMessage: z.infer<typeof zodMessage> = {
			text: text,
			date: Date.now(),
		}
    const newLastMessage1: z.infer<typeof zodLastMessage> = {
      text: text,
      date: Date.now(),
      type: "sent",
    }
    const newLastMessage2: z.infer<typeof zodLastMessage> = {
      text: text,
      date: Date.now(),
      type: "received",
    }
		set(newMessageRef, newMessage)
		set(lastMessageRef1, newLastMessage1)
		set(lastMessageRef2, newLastMessage2)
		setText("")
	}, [props.receiverUserUid, text, user])
	return (
		<div className="flex items-center gap-x-2">
			<Input
				placeholder="Type your message..."
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<Button onClick={onClickSend} disabled={!text}>
				<SendHorizonal />
			</Button>
		</div>
	)
}
