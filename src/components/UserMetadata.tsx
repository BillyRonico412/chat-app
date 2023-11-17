import { UserMetadataType } from "../utils"

interface UserProps {
	userMetadata: UserMetadataType
}

const UserMetadata = (props: UserProps) => {
	return (
		<div className="flex items-center gap-x-4">
			<img
				src={props.userMetadata.photoURL ?? ""}
				alt={props.userMetadata.username}
				className="w-10 h-10 rounded-full"
			/>
			<p className="text-sm font-medium">{props.userMetadata.username}</p>
		</div>
	)
}

export default UserMetadata
