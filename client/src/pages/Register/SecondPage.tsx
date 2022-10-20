import React from "react";

export default function SecondPage({
	nextPage,
	prevPage,
}: {
	nextPage: () => void;
	prevPage: () => void;
}) {
	return (
		<>
			<textarea
				className="text-lg w-4/5 shadow-lg border-2 mb-6 p-3 rounded-lg"
				placeholder={"Tell us about yourself..."}
				style={{ resize: "none" }}
				rows={10}
			/>
			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={nextPage}
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
