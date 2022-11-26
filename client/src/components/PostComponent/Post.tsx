import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { Post as PostType } from "../../types";
import { POST_IMAGE_PATH, USER_IMAGE_PATH } from "../../utils/backendURLS";
import DarkOverlay from "../DarkOverlay/DarkOverlay";

export default function Post({ post }: { post: PostType }) {
	const [visible, setVisible] = useState<boolean>(false);
	const user = useAppSelector(state => state.user.user);

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
				<Link to={`/users/${post.creator.userId}`} className="text-lg">
					{post.creator.username}
				</Link>
			</div>
			<Link
				style={{ height: "90%" }}
				className="relative"
				onMouseEnter={handleEnter}
				onMouseLeave={handleLeave}
				to={`posts/${post.postId}`}
			>
				<img
					src={`${POST_IMAGE_PATH}/${post.image}`}
					alt="Post"
					className="h-full w-full"
				/>
				{visible && (
					<DarkOverlay
						body={
							<>
								<p className="text-white font-semibold text-lg">
									{post.caption}
								</p>
							</>
						}
					/>
				)}
			</Link>
			<div className="flex items-center p-3">
				<div className="mr-4 flex flex-col items-center">
					{user?.likedPosts.find(e => e.postId === post.postId) ? (
						<>
							<AiFillHeart size={36} />
						</>
					) : (
						<>
							<AiOutlineHeart size={36} />
						</>
					)}

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
