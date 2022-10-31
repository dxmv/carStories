import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function Description({ text }: { text: string }) {
	return (
		<div className="border-b-4 pb-2 flex justify-between  text-lg">
			<p
				id="description"
				className="font-semibold text-2xl"
				style={{ height: "6%" }}
			>
				{text}
			</p>
			<AiOutlineHeart size={32} />
		</div>
	);
}
