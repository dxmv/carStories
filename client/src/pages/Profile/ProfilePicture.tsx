import React, { useState } from "react";
import { User } from "../../types";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import { FaImages } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Loading from "../../components/Loading/Loading";

export default function ProfilePicture({ id }: { id: number }) {
	const [hover, setHover] = useState<boolean>(false);
	const user = useAppSelector(state => state.user.user);

	if (!user) {
		return <Loading />;
	}

	const handleHover = () => {
		setHover(true);
	};

	const handleLeave = () => {
		setHover(false);
	};

	return (
		<div
			className="rounded-full w-56 h-56 relative"
			onMouseEnter={handleHover}
			onMouseLeave={handleLeave}
		>
			<img
				src={`${USER_IMAGE_PATH}/${user.image}`}
				className=" object-cover w-full h-full"
				alt="User"
			/>
			{Number(id) === user.userId && hover ? (
				<Link
					className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center flex-col"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
					to="/changeProfilePicture/"
				>
					<FaImages size={52} color="white" />
					<p className="text-white text-center mt-3">
						Click here to change your profile picture
					</p>
				</Link>
			) : (
				<></>
			)}
		</div>
	);
}
