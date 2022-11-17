import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Loading from "../../components/Loading/Loading";
import { useGetCommentByIdQuery } from "../../redux/api/commentSlice";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";

export default function Comment({ id }: { id: string }) {
	const { data, isLoading, isError, error } = useGetCommentByIdQuery({ id });

	if (isLoading || !data) {
		return <Loading />;
	}
	if (isError) {
		return <p>Error</p>;
	}

	console.log(data);
	return (
		<div className="w-full flex items-center mb-5 ">
			<img
				src={`${USER_IMAGE_PATH}/${data.author.image}`}
				alt="User"
				className="w-8 h-8 rounded-full mr-2"
			/>
			<div className="flex justify-between w-full items-center">
				<p className="text-md">{data.text}</p>
				<AiOutlineHeart />
			</div>
		</div>
	);
}
