import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useCreateCommentMutation } from "../../redux/api/commentSlice";

export default function AddComment({
	refetch,
	id,
}: {
	refetch: () => void;
	id: string;
}) {
	const [trigger] = useCreateCommentMutation();
	const [text, setText] = useState<string>("");

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		await setText(e.target.value);
	};

	const handleSubmit = async () => {
		await trigger({ text, id });
		await refetch();
	};

	return (
		<div
			id="add-comment"
			className="p-3 border-2 flex items-center"
			style={{ height: "10%" }}
		>
			<input
				type="text"
				className="w-full border-b-2 py-1 text-lg"
				style={{ outline: "none" }}
				placeholder="Type your comment..."
				onChange={handleChange}
				value={text}
			/>
			<AiOutlineSend size={28} onClick={handleSubmit} />
		</div>
	);
}
