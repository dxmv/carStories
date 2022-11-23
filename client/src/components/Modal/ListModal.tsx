import React from "react";
import { User } from "../../types";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";

export default function ListModal({
	title,
	list,
	tailwindSize,
	handleClose,
}: {
	title: string;
	list: Array<User>;
	tailwindSize: string;
	handleClose: () => void;
}) {
	return (
		<div
			className="absolute w-full h-full z-10 top-0 left-0 flex justify-center items-center"
			style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
		>
			<div className={`${tailwindSize} bg-white rounded-md p-5 flex flex-col`}>
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-2xl">{title}</h1>
					<button onClick={handleClose} className="font-bold">
						X
					</button>
				</div>
				<div>
					{list.map(e => (
						<UserListElement user={e} />
					))}
				</div>
			</div>
		</div>
	);
}

function UserListElement({ user }: { user: User }) {
	return (
		<div className="my-5 flex justify-between flex-1 items-center">
			<img
				alt="Follower"
				src={`${USER_IMAGE_PATH}/${user.image}`}
				className="rounded-full w-10 h-10"
			/>
			<div>
				<p className="font-bold">{user.username}</p>
				<p className="text-sm">{user.email}</p>
			</div>
			<button>Follow</button>
		</div>
	);
}
