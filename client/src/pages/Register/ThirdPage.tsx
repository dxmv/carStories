import React, { useState } from "react";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";
import { RegisterState } from "./registerTypes";

export default function ThirdPage({
	prevPage,
	user,
	setUser,
	submit,
}: {
	prevPage: () => void;
	user: RegisterState;
	setUser: React.Dispatch<React.SetStateAction<RegisterState>>;
	submit: () => void;
}) {
	const [error, setError] = useState<string>("");

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target?.files;
		const file: File | null = files ? files[0] : null;
		if (file) {
			if (file.type.split("/")[0] !== "image") {
				setError("File must be an image");
			} else {
				setError("");
				setUser(prev => {
					return { ...prev, image: file };
				});
				console.log(file);
			}
		} else {
			setError("There was an error while uploading a file.");
		}
	};

	const handleFinish = () => {
		if (error !== "") {
			return;
		}
		submit();
	};

	return (
		<>
			<div className="mb-2 w-full flex justify-center items-center relative flex-col">
				<div className="rounded-full w-44 h-44 bg-black flex flex-col items-center justify-center">
					{!user.image ? (
						<>
							<AiFillPicture size={28} color="white" className="mb-3" />
							<p className=" font-semibold mb-3 text-white text-center">
								Upload your profile picture here
							</p>
						</>
					) : (
						<img
							src={URL.createObjectURL(user.image)}
							alt="selected"
							className="w-full rounded-full h-full"
						/>
					)}
				</div>
				<label
					id="custom-file-upload"
					className="flex bg-orange-400 w-8 h-8  rounded-full text-black overflow-hidden justify-center items-center absolute bottom-1 right-40"
				>
					<AiFillCamera size={20} color="black" />
					<input type="file" className="hidden" onChange={handleUpload} />
				</label>
			</div>
			<p className="text-red-600 text-center mb-6">{error}</p>

			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={handleFinish}
			>
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
