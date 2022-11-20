import React from "react";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";

export default function ImageField({
	value,
	handleUpload,
	tailwindSize,
}: {
	value: File | null;
	handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	tailwindSize?: string;
}) {
	return (
		<div
			className={`mb-2 ${
				tailwindSize ? tailwindSize : "w-44"
			} flex justify-center items-center relative flex-col`}
		>
			<div className="rounded-full w-full h-44 bg-black flex flex-col items-center justify-center">
				{!value ? (
					<>
						<AiFillPicture size={28} color="white" className="mb-3" />
						<p className=" font-semibold mb-3 text-white text-center">
							Upload your profile picture here
						</p>
					</>
				) : (
					<img
						src={URL.createObjectURL(value)}
						alt="selected"
						className="w-full rounded-full h-full"
					/>
				)}
			</div>
			<label
				id="custom-file-upload"
				className="flex bg-orange-400 w-8 h-8  rounded-full text-black overflow-hidden justify-center items-center absolute bottom-1 right-2"
			>
				<AiFillCamera size={20} color="black" />
				<input type="file" className="hidden" onChange={handleUpload} />
			</label>
		</div>
	);
}
