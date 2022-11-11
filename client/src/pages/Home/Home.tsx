import React, { useEffect } from "react";
import Post from "../../components/PostComponent/Post";
import { useGetAllPostsQuery } from "../../redux/api/postSlice";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import PostList from "../../components/PostList/PostList";

export default function Home() {
	const { data, isLoading, isError, error } = useGetAllPostsQuery();

	if (isLoading || !data) {
		return <Loading />;
	}
	if (isError) {
		return <ErrorPage />;
	}
	console.log(data);
	return (
		<div className="w-screen flex justify-center items-center p-12">
			<PostList posts={data} />
			<ul
				className="ml-12 border-2 rounded-md shadow-md shadow-black"
				style={{ alignSelf: "start" }}
			>
				<li className="text-lg  px-3 py-2 border-b-2">All</li>
				<li className="text-lg  px-3 py-2 border-b-2">Following</li>
				<li className="text-lg  px-3 py-2">Followed by</li>
			</ul>
		</div>
	);
}
