import React, { useState } from "react";
import { RegisterState } from "./registerTypes";

export default function SecondPage({
	nextPage,
	prevPage,
	user,
	setUser,
}: {
	nextPage: () => void;
	prevPage: () => void;
	user: RegisterState;
	setUser: React.Dispatch<React.SetStateAction<RegisterState>>;
}) {
	const [error, setError] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value;
		if (text.length >= 50) {
			setError("Maximum length is 50");
		} else {
			setError("");
			setUser(prev => {
				return { ...prev, bio: text };
			});
		}
	};

	const handleNext = () => {
		if (error !== "") {
			return;
		}
		nextPage();
	};

	return (
		<>
			<textarea
				className="text-lg w-4/5 shadow-lg border-2 mb-2 p-3 rounded-lg"
				placeholder={"Tell us about yourself..."}
				style={{ resize: "none", borderColor: error === "" ? "black" : "red" }}
				rows={10}
				defaultValue={user.bio}
				onChange={handleChange}
			/>
			<p className="text-red-600 mb-6">{error}</p>
			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={handleNext}
			>
				NEXT
			</button>
			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={prevPage}
			>
				PREVIOUS
			</button>
		</>
	);
}
