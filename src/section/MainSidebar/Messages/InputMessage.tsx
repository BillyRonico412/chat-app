import { LuSendHorizonal } from "react-icons/lu"

const InputMessage = () => {
	return (
		<div className="flex gap-x-4">
			<input
				className="border rounded w-full py-2 px-2"
				placeholder="Type a message..."
			/>
			<button className="bg-blue-500 text-white rounded px-4 text-xl">
				<LuSendHorizonal />
			</button>
		</div>
	)
}

export default InputMessage
