import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { zodMessage } from "@/model"
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
		const newMessageRef = push(messagesRef)
		const newMessage: z.infer<typeof zodMessage> = {
			text: text,
			date: Date.now(),
		}
		set(newMessageRef, newMessage)
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
