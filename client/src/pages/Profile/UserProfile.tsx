import React from "react";
import Loading from "../../components/Loading/Loading";
import { useGetUserByIdQuery } from "../../redux/api/userSlice";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import ProfilePost from "./ProfilePost";

export default function UserProfile({ id }: { id: string }) {
	const { isLoading, isError, data } = useGetUserByIdQuery({ id });

	if (!data || isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <p>Error</p>;
	}

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
							Posts: {data.posts.length}
						</p>
						<p className="font-bold overflow-hidden">Likes: 0</p>
					</div>
				</div>
			</div>
			<div className="grid w-4/5 grid-cols-6 gap-5">
				{data.posts.map(p => (
					<ProfilePost key={p.postId} postId={`${p.postId}`} user={data} />
				))}
			</div>
		</div>
	);
}
