import React from "react";
import { Post as PostType } from "../../types";
import Post from "../PostComponent/Post";

export default function PostList({ posts }: { posts: PostType[] }) {
	return (
		<div className="flex flex-col w-1/4 p-0.5 h-full">
			{posts.map(post => (
				<Post key={post.postId} post={post} />
			))}
		</div>
	);
}
