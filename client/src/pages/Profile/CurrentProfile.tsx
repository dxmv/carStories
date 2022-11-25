import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import ProfilePost from "./ProfilePost";
import { User } from "../../types";
import ListModal from "../../components/Modal/ListModal";
import { Link } from "react-router-dom";

export default function CurrentProfile({ user }: { user: User }) {
	const [followedByModal, setFollowedByModal] = useState<boolean>(false);
	const [followingModal, setFollowingModal] = useState<boolean>(false);

	const handleOpenFollowedBy = () => {
		setFollowedByModal(true);
	};

	const handleOpenFollowing = () => {
		setFollowingModal(true);
	};

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
						<p
							className="mr-5 font-bold overflow-hidden"
							onClick={handleOpenFollowedBy}
						>
							Followers: {user.followedBy.length}
						</p>
						<p
							className="mr-5 font-bold overflow-hidden"
							onClick={handleOpenFollowing}
						>
							Following: {user.following.length}
						</p>
						<p className="font-bold overflow-hidden">
							Posts: {user.posts.length}
						</p>
					</div>
				</div>
				<div className="justify-self-end text-right">
					<Link to="/edit_user">Edit Profile</Link>
				</div>
			</div>
			<div className="grid w-4/5 grid-cols-6 gap-5">
				{user.posts &&
					user.posts.map(p => (
						<ProfilePost key={p.postId} postId={`${p.postId}`} user={user} />
					))}
			</div>
			{followedByModal && (
				<ListModal
					title="Followed by"
					list={user.followedBy}
					handleClose={() => setFollowedByModal(false)}
					tailwindSize={"w-1/6 h-3/6"}
				/>
			)}
			{followingModal && (
				<ListModal
					title="Following"
					list={user.following}
					handleClose={() => setFollowingModal(false)}
					tailwindSize={"w-1/6 h-3/6"}
				/>
			)}
		</div>
	);
}
