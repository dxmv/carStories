import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAppSelector } from "../../hooks";
import { useLikePostMutation } from "../../redux/api/postSlice";
import { User } from "../../types";

export default function Description({
	id,
	text,
	likes,
	refetch,
}: {
	id: string;
	text: string;
	likes: User[];
	refetch: () => void;
}) {
	const [trigger] = useLikePostMutation();

	const likePost = async () => {
		await trigger({ id });
		await refetch();
	};
	const user = useAppSelector(state => state.user.user);

	return (
		<div className="border-b-4 pb-2 flex justify-between  text-lg">
			<p
				id="description"
				className="font-semibold text-2xl"
				style={{ height: "6%" }}
			>
				{text}
			</p>
			{likes.find((e: User) => e.userId === user?.userId) ? (
				<AiFillHeart size={32} onClick={likePost} />
			) : (
				<AiOutlineHeart size={32} onClick={likePost} />
			)}
		</div>
	);
}
