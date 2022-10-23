import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./post.css";

export default function Post() {
	const [visible, setVisible] = useState<boolean>(false);

	const handleEnter = () => {
		setVisible(true);
	};

	const handleLeave = () => {
		setVisible(false);
	};

	return (
		<div className="w-1/4 h-2/3 shadow-md shadow-black">
			<div className="p-3 flex items-center">
				<span className="rounded-full bg-black w-8 h-8 mr-2"></span>
				<p className="text-lg">user</p>
			</div>
			<Link
				style={{ height: "90%" }}
				className="relative"
				onMouseEnter={handleEnter}
				onMouseLeave={handleLeave}
				to="post/1"
			>
				<img
					src="https://economictimes.indiatimes.com/thumb/msid-94422013,width-736,height-736,resizemode-4,imgsize-24360/andrew-tate-.jpg?from=mdr"
					alt="Tate"
					className="h-full"
				/>
				{visible && (
					<div
						className="absolute bottom-0 left-0 w-full h-full p-3 flex items-end"
						id="dark-overlay"
					>
						<p className="text-white font-semibold text-lg">
							Andrew Tate Der Boss!
						</p>
					</div>
				)}
			</Link>
			<div className="flex items-center p-3">
				<div className="mr-4 flex flex-col items-center">
					<AiOutlineHeart size={36} />1
				</div>
				<div className="flex flex-col items-center">
					<AiOutlineComment size={36} />1
				</div>
			</div>
		</div>
	);
}
