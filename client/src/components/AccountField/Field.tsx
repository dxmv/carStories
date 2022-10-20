import React from "react";

export default function Field({
	type,
	icon,
	placeholder,
}: {
	type: "text" | "password" | "email";
	icon: any;
	placeholder: string;
}) {
	return (
		<div className="w-4/5 relative">
			<input
				type={type}
				className="border-2 mb-6  rounded-lg text-lg p-2 w-full pl-10 shadow-md"
				placeholder={placeholder}
			/>
			{icon}
		</div>
	);
}
