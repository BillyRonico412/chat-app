import { UserMetadataType } from "../utils"

interface UserPhotoProps {
	userMetadata: UserMetadataType
}

const UserPhoto = (props: UserPhotoProps) => {
	if (!props.userMetadata.photoURL) {
		return (
			<div className="w-10 h-10 rounded-full">
				{props.userMetadata.username[0]}
			</div>
		)
	}
	return (
		<img
			referrerPolicy="no-referrer"
			src={props.userMetadata.photoURL}
			alt={props.userMetadata.username}
			className="w-10 h-10 rounded-full"
		/>
	)
}

export default UserPhoto
