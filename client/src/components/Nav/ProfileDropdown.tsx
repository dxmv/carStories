import React from "react";
import { AiOutlineUser, AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logoutUser } from "../../redux/userSlice";
import { deleteToken } from "../../utils/jwtTokenHandle";

export default function ProfileDropdown() {
	const user = useAppSelector(state => state.user.user);
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await dispatch(logoutUser);
		await deleteToken();
	};

	return (
		<div
			className="absolute right-3   w-1/5 whitespace-nowrap top-12 rounded-md bg-white border-2 shadow-md shadow-black overflow-visible"
			style={{ zIndex: "100", width: "8%" }}
			id="dropdown"
		>
			<Link
				className="flex p-2 items-center relative overflow-visible"
				to={`/users/${user?.userId}`}
			>
				<AiOutlineUser size={20} className="mr-2" />
				<p>Profile</p>
				<span
					className="absolute bg-white w-3 h-3 right-2 border-b-2 border-l-2"
					style={{ rotate: "135deg", right: "8px", top: "-7px" }}
				></span>
			</Link>
			<Link className="flex p-2 items-center" to="/options">
				<AiFillSetting size={20} className="mr-2" />
				<p>Options</p>
			</Link>
			<Link
				className="flex p-2 border-t-2 items-center"
				to="/login"
				onClick={handleLogout}
			>
				<AiOutlineLogout size={20} className="mr-2" />
				<p>Logout</p>
			</Link>
		</div>
	);
}
