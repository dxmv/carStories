import React from "react";
import { FaImages } from "react-icons/fa";

export default function NewPost() {
	return (
		<div className="flex justify-center items-center pt-12 w-full flex-col">
			<input
				type="text"
				className="w-4/5 rounded-md border-2 shadow-md text-lg p-3 mb-5"
				placeholder="Caption ..."
			/>
			<label
				className="w-4/5 rounded-md border-2 shadow-md mb-5 flex flex-col justify-center items-center"
				style={{ height: "640px" }}
			>
				<FaImages size={200} />
				<p className="text-3xl font-bold">Upload your picture here</p>
				<input type="file" className="hidden w-full h-full" />
			</label>
			<button className="text-xl bg-orange-400 p-4 text-white font-bold rounded-lg">
				Finish
			</button>
		</div>
	);
}
