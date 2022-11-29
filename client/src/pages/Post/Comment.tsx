import React, { useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Loading from "../../components/Loading/Loading";
import YesNoModal from "../../components/Modal/YesNoModal";
import { useAppSelector } from "../../hooks";
import {
	useDeleteCommentMutation,
	useEditCommentMutation,
	useGetCommentByIdQuery,
	useLikeCommentMutation,
} from "../../redux/api/commentSlice";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";

export default function Comment({ id }: { id: string }) {
	const { data, isLoading, isError, refetch } = useGetCommentByIdQuery(id);
	const user = useAppSelector(state => state.user.user);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	const editRef = useRef<HTMLInputElement | null>(null);
	const [trigger] = useDeleteCommentMutation();
	const [triggerLike] = useLikeCommentMutation();
	const [triggerEdit] = useEditCommentMutation();

	if (isLoading || !data) {
		return <Loading />;
	}
	if (isError) {
		return <p>Error</p>;
	}

	const handleLike = async () => {
		await triggerLike(id);
		await refetch();
	};

	const handleEdit = async () => {
		console.log(editRef.current?.value);
		if (editRef.current?.value === data.text) {
			return;
		}
		await triggerEdit({ id: id, text: editRef.current?.value || "" });
		await refetch();
		await setEdit(false);
	};

	return (
		<div className="w-full flex items-center mb-5 ">
			<img
				src={`${USER_IMAGE_PATH}/${data.author.image}`}
				alt="User"
				className="w-8 h-8 rounded-full mr-2"
			/>
			<div className="flex justify-between w-full items-center">
				{user?.userId == data.author.userId ? (
					<div className="flex flex-col">
						{edit ? (
							<>
								<input type="text" ref={editRef} />
								<div className="flex">
									<p className="text-sm mr-2" onClick={handleEdit}>
										Save
									</p>
									<p className="text-sm" onClick={() => setEdit(false)}>
										Cancel
									</p>
								</div>
							</>
						) : (
							<>
								<p className="text-lg">{data.text}</p>
								<div className="flex">
									<p className="text-sm mr-2" onClick={() => setEdit(true)}>
										Edit
									</p>
									<p className="text-sm" onClick={() => setDeleteModal(true)}>
										Delete
									</p>
								</div>
							</>
						)}
					</div>
				) : (
					<p>{data.text}</p>
				)}

				{data.likedBy.findIndex(e => e.userId === user?.userId) !== -1 ? (
					<AiFillHeart onClick={handleLike} />
				) : (
					<AiOutlineHeart onClick={handleLike} />
				)}
			</div>
			{deleteModal && (
				<YesNoModal
					handleClose={() => setDeleteModal(false)}
					question="Are you sure you want to delete this post?"
					tailwindSize="w-2/6"
					action={async () => {
						await trigger(id);
						setDeleteModal(false);
					}}
				/>
			)}
		</div>
	);
}
