import React from "react";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";
import { RegisterState } from "./registerTypes";

export default function ThirdPage({
	prevPage,
	user,
	setUser,
}: {
	prevPage: () => void;
	user: RegisterState;
	setUser: React.Dispatch<React.SetStateAction<RegisterState>>;
}) {
	return (
		<>
			<div className="mb-6 w-full flex justify-center items-center relative flex-col">
				<div className="rounded-full w-44 h-44 bg-black flex flex-col items-center justify-center">
					<AiFillPicture size={28} color="white" className="mb-3" />
					<p className=" font-semibold mb-3 text-white text-center">
						Upload your profile picture here
					</p>
				</div>
				<label
					id="custom-file-upload"
					className="flex bg-orange-400 w-8 h-8  rounded-full text-black overflow-hidden justify-center items-center absolute bottom-1 right-40"
				>
					<AiFillCamera size={20} color="black" />
					<input type="file" className="hidden" />
				</label>
			</div>
			<button className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg">
				FINISH
			</button>
			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={prevPage}
			>
				BACK
			</button>
		</>
	);
}
