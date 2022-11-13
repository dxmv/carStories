import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Post as PostType } from "../../types";
import { POST_IMAGE_PATH, USER_IMAGE_PATH } from "../../utils/backendURLS";
import "./post.css";

export default function Post({ post }: { post: PostType }) {
	const [visible, setVisible] = useState<boolean>(false);

	const handleEnter = () => {
		setVisible(true);
	};

	const handleLeave = () => {
		setVisible(false);
	};

	return (
		<div className="w-full h-2/3 shadow-md shadow-black mb-10 overflow-visible">
			<div className="p-3 flex items-center">
				<img
					className="rounded-full overflow-hidden w-8 h-8 mr-2"
					src={`${USER_IMAGE_PATH}/${post.creator.image}`}
					alt="User"
				/>
				<p className="text-lg">{post.creator.username}</p>
			</div>
			<Link
				style={{ height: "90%" }}
				className="relative"
				onMouseEnter={handleEnter}
				onMouseLeave={handleLeave}
				to="post/1"
			>
				<img
					src={`${POST_IMAGE_PATH}/${post.image}`}
					alt="Post"
					className="h-full w-full"
				/>
				{visible && (
					<div
						className="absolute bottom-0 left-0 w-full h-full p-3 flex items-end"
						id="dark-overlay"
					>
						<p className="text-white font-semibold text-lg">{post.caption}</p>
					</div>
				)}
			</Link>
			<div className="flex items-center p-3">
				<div className="mr-4 flex flex-col items-center">
					<AiOutlineHeart size={36} />
					{post.likes.length}
				</div>
				<div className="flex flex-col items-center">
					<AiOutlineComment size={36} />
					{post.comments.length}
				</div>
			</div>
		</div>
	);
}
