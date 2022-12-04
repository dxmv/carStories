import React from "react";

export default function Field({
	type,
	icon,
	placeholder,
	error,
	value,
	setValue,
	className,
	inputClassName,
}: {
	type: "text" | "password" | "email";
	icon: any;
	placeholder: string;
	error: string;
	value: string;
	setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	inputClassName?: string;
}) {
	return (
		<div className={className ? className : `w-4/5 relative mb-6`}>
			<input
				type={type}
				className={`border-2 rounded-lg text-lg p-2 w-full pl-10 shadow-md ${
					inputClassName && inputClassName
				}`}
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
