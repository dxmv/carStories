import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useLazyGetPostByIdQuery } from "../../redux/api/postSlice";
import { Post, User } from "../../types";
import { POST_IMAGE_PATH } from "../../utils/backendURLS";

export default function ProfilePost({
	postId,
	user,
}: {
	postId: string;
	user: User;
}) {
	const [visible, setVisible] = useState<boolean>(false);
	const [post, setPost] = useState<Post | null>(null);
	const [trigger] = useLazyGetPostByIdQuery();

	useEffect(() => {
		trigger(postId).then(r => {
			if (r.data) {
				setPost(r.data);
			}
		});
	}, []);

	if (!post) {
		return <Loading />;
	}

	const handleHover = () => {
		setVisible(true);
	};

	const handleLeave = () => {
		setVisible(false);
	};

	return (
		<Link
			to={`/posts/${postId}`}
			className="relative bg-black overflow-hidden rounded-lg shadow-md shadow-black w-full h-72 m-2"
			onMouseEnter={handleHover}
			onMouseLeave={handleLeave}
		>
			<img
				src={`${POST_IMAGE_PATH}/${post.image}`}
				alt="Post"
				className="h-full w-full object-cover "
			/>
			{visible && (
				<div
					className="absolute top-0 left-0 w-full h-full flex items-center justify-around"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				>
					<div className="mr-4 flex flex-col items-center">
						{user.likedPosts.find(curr => curr.postId === Number(postId)) ? (
							<AiFillHeart size={52} color="white" />
						) : (
							<AiOutlineHeart size={52} color="white" />
						)}

						<p className="text-white">{post.likes.length}</p>
					</div>
					<div className="flex flex-col items-center">
						<AiOutlineComment size={52} color="white" />
						<p className="text-white">{post.comments.length}</p>
					</div>
				</div>
			)}
		</Link>
	);
}
