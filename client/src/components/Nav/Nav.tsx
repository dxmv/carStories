import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { USER_IMAGE_PATH } from "../../utils/backendURLS";
import ProfileDropdown from "./ProfileDropdown";
import Search from "./Search";

export default function Nav() {
	const [open, setOpen] = useState<boolean>(false);
	const user = useAppSelector(state => state.user.user);

	const handleOpen = () => {
		setOpen(prev => !prev);
	};

	return (
		<div
			className="w-full border-b-2 p-3 flex items-center justify-between relative"
			style={{ height: "6%", overflow: "visible" }}
		>
			<div>Logo</div>
			<Search />
			<div className="flex items-center overflow-visible whitespace-nowrap">
				<Link to={"/"}>
					<AiFillHome size={32} className="mr-6" />
				</Link>
				<Link to={"/new_post"}>
					<MdAddBox size={32} className="mr-6" />
				</Link>
				<img
					className="rounded-full w-8 h-8 bg-black"
					src={`${USER_IMAGE_PATH}/${user?.image}`}
					alt="User"
					onClick={handleOpen}
				/>
				{open && <ProfileDropdown />}
			</div>
		</div>
	);
}
