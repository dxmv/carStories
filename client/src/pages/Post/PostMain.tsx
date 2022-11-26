import React, { useState } from "react";
import DarkOverlay from "../../components/DarkOverlay/DarkOverlay";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import { Post } from "../../types";
import { useAppSelector } from "../../hooks";
import YesNoModal from "../../components/Modal/YesNoModal";
import { useDeletePostMutation } from "../../redux/api/postSlice";

const IMAGE_PATH = "http://localhost:8080/images/posts";

export default function PostMain({ data }: { data: Post }) {
	const [visible, setVisible] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const user = useAppSelector(state => state.user.user);
	const [trigger] = useDeletePostMutation();

	return (
		<>
			<div className="w-3/6 h-5/6 flex flex-col border-2">
				<div className="p-4 flex items-center overflow-hidden border-b-2">
					<img
						className="rounded-full w-8 h-8 mr-2 overflow-hidden"
						src={`${USER_IMAGE_PATH}/${data.creator.image}`}
						alt="User"
					/>
					<p className="text-lg">{data.creator.username}</p>
				</div>
				<div
					className="relative"
					onMouseEnter={() => {
						setVisible(true);
					}}
					onMouseLeave={() => {
						setVisible(false);
					}}
				>
					<img
						src={`${IMAGE_PATH}/${data.image}`}
						alt="Post"
						className="h-full w-full"
					/>
					{visible && data.creator.userId == user?.userId && (
						<DarkOverlay
							body={
								<>
									<AiTwotoneEdit size={48} color="white" className="mr-4" />
									<AiTwotoneDelete
										size={48}
										color="white"
										onClick={() => {
											setDeleteModal(true);
										}}
									/>
								</>
							}
						/>
					)}
				</div>
			</div>
			{deleteModal && (
				<YesNoModal
					handleClose={() => {
						setDeleteModal(false);
					}}
					question="Are you sure you want to delete this post?"
					tailwindSize="w-2/6"
					action={() => {
						trigger(`${data.postId}`);
						console.log("Deleted");
					}}
				/>
			)}
		</>
	);
}
