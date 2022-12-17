import React, { useState } from "react";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";
import ImageField from "../../components/AccountField/ImageField";
import FormButton from "../../components/FormButton/FormButton";
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

			<div className="flex flex-row-reverse justify-around w-4/5 ">
				<FormButton
					text="FINISH"
					handleClick={handleFinish}
					className=" bg-orange-400 w-2/6 text-white"
				/>
				<FormButton
					text="BACK"
					handleClick={prevPage}
					className=" bg-orange-400 w-2/6 text-white "
				/>
			</div>
		</>
	);
}
