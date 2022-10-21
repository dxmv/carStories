import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

export default function ProfilePost({ image }: { image: string }) {
	const [visible, setVisible] = useState<boolean>(false);

	const handleHover = () => {
		setVisible(true);
	};

	const handleLeave = () => {
		setVisible(false);
	};

	return (
		<div
			className="relative bg-black overflow-hidden rounded-lg shadow-md shadow-black"
			onMouseEnter={handleHover}
			onMouseLeave={handleLeave}
		>
			<img src={image} alt="Post" className="h-full w-full" />
			{visible && (
				<div
					className="absolute top-0 left-0 w-full h-full flex items-center justify-around"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				>
					<div className="mr-4 flex flex-col items-center">
						<AiOutlineHeart size={52} color="white" />
						<p className="text-white">1</p>
					</div>
					<div className="flex flex-col items-center">
						<AiOutlineComment size={52} color="white" />
						<p className="text-white">1</p>
					</div>
				</div>
			)}
		</div>
	);
}
