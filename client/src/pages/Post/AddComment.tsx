import React from "react";
import { AiOutlineSend } from "react-icons/ai";

export default function AddComment() {
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
			/>
			<AiOutlineSend size={28} />
		</div>
	);
}
