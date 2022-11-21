import React from "react";
import ProfilePicture from "./ProfilePicture";
import ProfilePost from "./ProfilePost";
import { User } from "../../types";

export default function CurrentProfile({ user }: { user: User }) {
	return (
		<div className="flex justify-center items-center pt-12 w-full flex-col">
			<div className="border-b-2 w-4/5 mb-12 flex pb-5 ">
				<ProfilePicture user={user} />
				<div className="flex flex-col ml-5 ">
					<p className="mb-5 text-3xl font-bold overflow-hidden">
						{user.username}
					</p>
					<p className="mb-5 text-lg font-light overflow-hidden">
						{user.email}
					</p>
					<p className="w-4/5 text-lg mb-5 h-2/5 overflow-hidden">{user.bio}</p>
					<div className="flex ">
						<p className="mr-5 font-bold overflow-hidden">Posts: 1</p>
						<p className="font-bold overflow-hidden">Likes: 0</p>
					</div>
				</div>
				<div className="justify-self-end text-right">
					<button>Edit Profile</button>
				</div>
			</div>
			<div className="grid w-4/5 grid-cols-6 gap-5">
				{user.posts &&
					user.posts.map(p => (
						<ProfilePost key={p.postId} postId={`${p.postId}`} user={user} />
					))}
			</div>
		</div>
	);
}
