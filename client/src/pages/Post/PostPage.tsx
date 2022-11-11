import React from "react";
import Loading from "../../components/Loading/Loading";
import { useGetPostByIdQuery } from "../../redux/api/postSlice";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import Description from "./Description";
import ErrorPage from "../ErrorPage/ErrorPage";

const IMAGE_PATH = "http://localhost:8080/images/posts";

export default function PostPage() {
	const { data, isLoading, error, isError } = useGetPostByIdQuery(2);

	if (isLoading || !data) {
		return <Loading />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<div className="w-screen flex justify-center  px-20 py-12 h-screen ">
			<div className="w-3/6 h-5/6 flex flex-col border-2">
				<div className="p-4 flex items-center overflow-hidden border-b-2">
					<img
						className="rounded-full w-8 h-8 mr-2 overflow-hidden"
						src={`${IMAGE_PATH}/${data.image}`}
						alt="User"
					/>
					<p className="text-lg">{data.creator.username}</p>
				</div>
				<div>
					<img
						src={`${IMAGE_PATH}/${data.image}`}
						alt="Post"
						className="h-full w-full"
					/>
				</div>
			</div>
			<div className="ml-5 w-1/5 rounded-md h-5/6 border-2 px-3 py-5 overflow-y-hidden">
				<Description text={data?.caption} />
				{data.comments.length === 0 ? (
					<div
						className="my-4 flex justify-center items-center"
						style={{ height: "80%" }}
					>
						<p className="font-semibold text-xl opacity-80">No comments</p>
					</div>
				) : (
					<CommentList comments={data.comments} />
				)}
				<AddComment />
			</div>
		</div>
	);
}
