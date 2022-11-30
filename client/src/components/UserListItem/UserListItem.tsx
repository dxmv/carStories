import React from "react";
import { Link } from "react-router-dom";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";

export default function UserListItem({
	className,
	username,
	image,
	id,
}: {
	className?: string;
	username: string;
	image: string;
	id: number;
}) {
	return (
		<Link
			to={`/users/${id}`}
			className={`w-full flex items-center ${className ?? "p-2"} border-b-2`}
		>
			<img
				src={`${USER_IMAGE_PATH}/${image}`}
				alt="User"
				className="rounded-full h-8 w-8 mr-5"
			/>
			<p className="font-semibold ">{username}</p>
		</Link>
	);
}
