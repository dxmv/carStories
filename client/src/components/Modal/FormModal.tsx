import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { useChangeUserImageMutation } from "../../redux/api/userSlice";
import { setUser } from "../../redux/userSlice";
import ImageField from "../AccountField/ImageField";

export default function FormModal({
	handleClose,
	title,
	tailwindSize,
}: {
	handleClose: () => void;
	title: string;
	tailwindSize: string;
}) {
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState<string>("");
	const [trigger] = useChangeUserImageMutation();
	const dispatch = useAppDispatch();

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target?.files;
		const file: File | null = files ? files[0] : null;
		if (file) {
			if (file.type.split("/")[0] !== "image") {
				setError("File must be an image");
			} else {
				setError("");
				setImage(file);
			}
		} else {
			setError("There was an error while uploading a file.");
		}
	};

	const handleSubmit = async () => {
		if (!image) {
			setError("You must choose an image");
			return;
		}
		try {
			let formData = new FormData();
			formData.append("image", image);
			const res = await trigger(formData).unwrap();
			if (res) {
				await dispatch(setUser(res));
				await handleClose();
			} else {
				throw new Error("There was an error");
			}
		} catch (e) {
			let message = (e as Error).message;
			await setError(message);
		}
	};

	return (
		<div
			className="absolute w-full h-full z-10 top-0 left-0 flex justify-center items-center"
			style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
		>
			<div
				className={`${tailwindSize} bg-white rounded-md p-5 flex flex-col justify-between`}
			>
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-2xl">{title}</h1>
					<button onClick={handleClose} className="font-bold">
						X
					</button>
				</div>
				<p>{error}</p>
				<div className="text-align-center">
					<ImageField value={image} handleUpload={handleUpload} />
				</div>
				<div className="flex justify-center">
					<button className="mr-2" onClick={handleSubmit}>
						SAVE CHANGES
					</button>
					<button onClick={handleClose}>CLOSE</button>
				</div>
			</div>
		</div>
	);
}
