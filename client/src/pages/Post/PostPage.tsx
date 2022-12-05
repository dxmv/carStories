import React from "react";
import Loading from "../../components/Loading/Loading";
import { useGetPostByIdQuery } from "../../redux/api/postSlice";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import Description from "./Description";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useParams } from "react-router-dom";
import PostMain from "./PostMain";
import { useAppSelector } from "../../hooks";
import UserDescription from "./UserDescription";

export default function PostPage() {
	const { id } = useParams();
	const { data, isLoading, isError, refetch } = useGetPostByIdQuery(id || "1");
	const user = useAppSelector(state => state.user.user);

	if (isLoading || !data) {
		return <Loading />;
	}
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<div className="w-screen flex justify-center  px-20 py-12 h-screen ">
			<PostMain data={data} />
			<div className="ml-5 w-1/5 rounded-md h-5/6 border-2 px-3 py-5 overflow-y-hidden">
				{user?.userId === data.creator.userId ? (
					<UserDescription
						id={`${data.postId}`}
						text={data.caption}
						refetch={refetch}
					/>
				) : (
					<Description
						id={`${data.postId}`}
						text={data.caption}
						likes={data.likes}
						refetch={refetch}
					/>
				)}

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
				<AddComment refetch={refetch} id={`${data.postId}`} />
			</div>
		</div>
	);
}
