import React from "react";
import "./overlay.css";

export default function DarkOverlay({ body }: { body: any }) {
	return (
		<div
			className="absolute bottom-0 left-0 w-full h-full p-3 flex items-end"
			id="dark-overlay"
		>
			{body}
		</div>
	);
}
