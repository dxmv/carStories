import React, { useState } from "react";
import { User } from "../../types";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import { FaImages } from "react-icons/fa";
import FormModal from "../../components/Modal/FormModal";

export default function ProfilePicture({ user }: { user: User }) {
	const [hover, setHover] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	const handleHover = () => {
		setHover(true);
	};

	const handleLeave = () => {
		setHover(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
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
				{hover && (
					<div
						className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center flex-col"
						style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
						onClick={handleOpen}
					>
						<FaImages size={52} color="white" />
						<p className="text-white text-center mt-3">
							Click here to change your profile picture
						</p>
					</div>
				)}
			</div>
			{open && (
				<FormModal
					handleClose={handleClose}
					title="Change your profile picture"
					tailwindSize="w-1/6 h-3/6"
				/>
			)}
		</>
	);
}
