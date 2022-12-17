import React, { useState } from "react";
import FormButton from "../../components/FormButton/FormButton";
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

	const handleNext = async () => {
		if (user.bio === "") {
			await setError("This field shouldn't be empty");
			return;
		}
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
			<div className="flex flex-row-reverse justify-around w-4/5 ">
				<FormButton
					text="NEXT"
					handleClick={handleNext}
					className=" bg-orange-400 w-1/5 text-white"
				/>
				<FormButton
					text="BACK"
					handleClick={prevPage}
					className=" bg-orange-400 w-1/5 text-white "
				/>
			</div>
		</>
	);
}
