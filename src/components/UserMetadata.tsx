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
			/>
			<p>{props.userMetadata.username}</p>
		</div>
	)
}

export default UserMetadata
