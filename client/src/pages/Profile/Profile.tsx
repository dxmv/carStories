import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useLazyGetUserByIdQuery } from "../../redux/api/userSlice";
import { User } from "../../types";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import ProfilePost from "./ProfilePost";

export default function Profile() {
	const { id } = useParams();
	const [user, setUser] = useState<User | null>(null);
	const [trigger, data] = useLazyGetUserByIdQuery();

	useEffect(() => {
		trigger({ id: id || "1" }).then(r => {
			if (r.data) {
				setUser(r.data);
			}
		});
	}, []);

	if (!user) {
		return <Loading />;
	}

	console.log(user);
	return (
		<div className="flex justify-center items-center pt-12 w-full flex-col">
			<div className="border-b-2 w-4/5 mb-12 flex pb-5">
				<img
					src={`${USER_IMAGE_PATH}/${user.image}`}
					className="rounded-full w-1/5 h-1/5"
					alt="User"
				/>
				<div className="flex flex-col ml-5">
					<p className="mb-5 text-3xl font-bold">{user.username}</p>
					<p className="mb-5 text-lg font-light">{user.email}</p>
					<p className="w-4/5 text-lg mb-5 h-2/5">{user.bio}</p>
					<div className="flex ">
						<p className="mr-5 font-bold">Posts: {user.posts.length}</p>
						<p className="font-bold">Likes: 0</p>
					</div>
				</div>
			</div>
			<div className="grid w-4/5 grid-cols-5 gap-5">
				{user.posts.map(p => (
					<ProfilePost key={p.postId} postId={`${p.postId}`} />
				))}
			</div>
		</div>
	);
}
