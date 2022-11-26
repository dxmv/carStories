import React from "react";

export default function YesNoModal({
	handleClose,
	tailwindSize,
	question,
	action,
}: {
	handleClose: () => void;
	tailwindSize: string;
	question: string;
	action: () => any;
}) {
	return (
		<div
			className="absolute w-full h-full z-10 top-0 left-0 flex justify-center items-center"
			style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
		>
			<div
				className={`${tailwindSize} bg-white rounded-md p-5 flex flex-col justify-between items-center`}
			>
				<p className="font-bold text-3xl">{question}</p>
				<div className="flex mt-5">
					<button onClick={action} className="mr-5">
						Yes
					</button>
					<button onClick={handleClose}>No</button>
				</div>
			</div>
		</div>
	);
}
