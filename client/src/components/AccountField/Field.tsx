import React from "react";

export default function Field({
	type,
	icon,
	placeholder,
	error,
	value,
	setValue,
}: {
	type: "text" | "password" | "email";
	icon: any;
	placeholder: string;
	error: string;
	value: string;
	setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<div className="w-4/5 relative mb-6">
			<input
				type={type}
				className="border-2 rounded-lg text-lg p-2 w-full pl-10 shadow-md"
				style={{
					borderColor: error !== "" ? "red" : "black",
				}}
				placeholder={placeholder}
				defaultValue={value}
				onChange={setValue}
			/>
			{icon}
			{error !== "" && (
				<p className="text-sm mt-2" style={{ color: "red" }}>
					{error}
				</p>
			)}
		</div>
	);
}
