import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Loading from "../../components/Loading/Loading";
import { useGetCommentByIdQuery } from "../../redux/api/commentSlice";

export default function Comment({ id }: { id: string }) {
	const { data, isLoading, isError, error } = useGetCommentByIdQuery({ id });

	if (isLoading || !data) {
		return <Loading />;
	}
	if (isError) {
		return <p>Error</p>;
	}

	return (
		<div className="w-full flex items-center mb-5">
			<span className="rounded-full bg-black w-6 h-6 mr-2"></span>
			<div className="flex justify-between w-full items-center">
				<p className="text-md">{data.text}</p>
				<AiOutlineHeart />
			</div>
		</div>
	);
}
