import type { MessageItemType } from "@/pages/MessagesByUser"
import clsx from "clsx"
import dayjs from "dayjs"

interface MessageItemProps {
	message: MessageItemType
}

export const MessageItem = (props: MessageItemProps) => {
	return (
		<div
			className={clsx(
				"flex",
				props.message.type === "sent" && "justify-end",
				props.message.type === "received" && "justify-start",
			)}
		>
			<div
				className={clsx(
					props.message.type === "sent" && "bg-muted",
					props.message.type === "received" && "bg-primary",
					"px-4 py-2 rounded-[--radius] inline-flex max-w-[80%] text-sm break-words flex-col gap-y-1",
				)}
			>
				<p>{props.message.text}</p>
				<p className="text-xs ml-auto">
					{dayjs(props.message.date).format("HH:mm")}
				</p>
			</div>
		</div>
	)
}
