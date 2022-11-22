import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import ListModal from "../../components/Modal/ListModal";
import { useAppDispatch } from "../../hooks";
import {
	useFollowUserMutation,
	useGetUserByIdQuery,
} from "../../redux/api/userSlice";
import { setUser } from "../../redux/userSlice";
import { User } from "../../types";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import ProfilePost from "./ProfilePost";

export default function UserProfile({
	id,
	currentUser,
}: {
	id: string;
	currentUser: User;
}) {
	const [followedByModal, setFollowedByModal] = useState<boolean>(true);
	const { isLoading, isError, data, refetch } = useGetUserByIdQuery({ id });
	const [trigger] = useFollowUserMutation();
	const dispatch = useAppDispatch();

	if (!data || isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <p>Error</p>;
	}

	const handleFollow = async () => {
		try {
			const res = await trigger(id).unwrap();
			if (res) {
				await dispatch(setUser(res));
				await refetch();
			}
		} catch (e) {
			let message = (e as Error).message;
			console.log(message);
		}
	};

	return (
		<div className="flex justify-center items-center pt-12 w-full flex-col">
			<div className="border-b-2 w-4/5 mb-12 flex pb-5">
				<div className="rounded-full w-56 h-56 relative">
					<img
						src={`${USER_IMAGE_PATH}/${data.image}`}
						className=" object-cover w-full h-full"
						alt="User"
					/>
				</div>
				<div className="flex flex-col ml-5 ">
					<p className="mb-5 text-3xl font-bold overflow-hidden">
						{data.username}
					</p>
					<p className="mb-5 text-lg font-light overflow-hidden">
						{data.email}
					</p>
					<p className="w-4/5 text-lg mb-5 h-2/5 overflow-hidden">{data.bio}</p>
					<div className="flex ">
						<p className="mr-5 font-bold overflow-hidden">
							Followers: {data.followedBy.length}
						</p>
						<p className="font-bold overflow-hidden">
							Posts: {data.posts.length}
						</p>
					</div>
				</div>
				<div>
					<button onClick={handleFollow}>
						{currentUser.following.find(e => e.userId === Number(id))
							? "Following"
							: "Follow"}
					</button>
				</div>
			</div>
			<div className="grid w-4/5 grid-cols-6 gap-5">
				{data.posts.map(p => (
					<ProfilePost key={p.postId} postId={`${p.postId}`} user={data} />
				))}
			</div>
			{followedByModal && (
				<ListModal
					title="Followed by"
					list={data.followedBy}
					handleClose={() => setFollowedByModal(false)}
					tailwindSize={"w-1/6 h-3/6"}
				/>
			)}
		</div>
	);
}
