import React from "react";

export default function FormButton({
	handleClick,
	text,
	className,
}: {
	handleClick: () => any;
	text: string;
	className: string;
}) {
	return (
		<button
			className={`p-2 font-bold rounded-md text-lg mb-6 ${
				className && className
			}`}
			onClick={handleClick}
		>
			{text}
		</button>
	);
}
