import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function Comment({ text }: { text: string }) {
	return (
		<div className="w-full flex items-center mb-5">
			<span className="rounded-full bg-black w-6 h-6 mr-2"></span>
			<div className="flex justify-between w-full items-center">
				<p className="text-md">{text}</p>
				<AiOutlineHeart />
			</div>
		</div>
	);
}
