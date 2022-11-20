import React, { useState } from "react";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";
import ImageField from "../../components/AccountField/ImageField";
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
			<ImageField value={user.image} handleUpload={handleUpload} />
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
