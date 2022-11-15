import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import { useCreatePostMutation } from "../../redux/api/postSlice";

interface CreatePost {
	caption: string;
	image: File | null;
}

interface CreatePostError {
	captionError: string;
	imageError: string;
	formError: string;
}

export default function NewPost() {
	const [post, setPost] = useState<CreatePost>({
		caption: "",
		image: null,
	});
	const [error, setError] = useState<CreatePostError>({
		captionError: "",
		imageError: "",
		formError: "",
	});
	const [trigger] = useCreatePostMutation();

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target?.files;
		const file: File | null = files ? files[0] : null;
		if (file) {
			if (file.type.split("/")[0] !== "image") {
				setError(prev => ({ ...prev, imageError: "File must be an image" }));
			} else {
				await setError(prev => ({ ...prev, imageError: "" }));
				await setPost(prev => ({ ...prev, image: file }));
			}
		} else {
			await setError(prev => ({
				...prev,
				imageError: "There was an error while uploading the file",
			}));
		}
	};

	const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPost(prev => ({ ...prev, caption: e.target.value }));
	};

	const handleSubmit = async () => {
		if (post.caption === "" || post.image === null) {
			return;
		}
		const formData = new FormData();
		formData.append("caption", post.caption);
		formData.append("image", post.image);
		await trigger(formData);
	};

	return (
		<div className="flex justify-center items-center pt-12 w-full flex-col">
			<input
				type="text"
				className="w-4/5 rounded-md border-2 shadow-md text-lg p-3 mb-5"
				placeholder="Caption ..."
				onChange={handleCaptionChange}
			/>
			<label
				className="w-4/5 rounded-md border-2 shadow-md mb-5 flex flex-col justify-center items-center"
				style={{
					height: "640px",
					borderColor: error.imageError ? "red" : "gray",
				}}
			>
				<FaImages size={200} />
				<p className="text-3xl font-bold">Upload your picture here</p>
				<p className="text-xl font-bold">{error.imageError}</p>
				<input
					type="file"
					className="hidden w-full h-full"
					onChange={handleFileUpload}
				/>
			</label>
			<button
				className="text-xl bg-orange-400 p-4 text-white font-bold rounded-lg"
				onClick={handleSubmit}
			>
				Finish
			</button>
		</div>
	);
}
