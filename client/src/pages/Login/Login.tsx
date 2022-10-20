import React from "react";
import { Link } from "react-router-dom";
import Field from "../../components/AccountField/Field";
import { BsFillKeyFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

export default function Login() {
	return (
		<div className="w-screen h-screen overflow-hidden flex justify-center items-center">
			<div className="flex flex-col items-center w-1/5  p-6 shadow-xl rounded-lg border-2">
				<h1 className="mb-6 font-bold text-3xl">LOGO</h1>
				<Field
					type="text"
					icon={<AiOutlineUser className="absolute top-2 left-2" size={32} />}
					placeholder="Username ..."
				/>
				<Field
					type="password"
					icon={<BsFillKeyFill className="absolute top-2 left-2" size={32} />}
					placeholder="Password ..."
				/>
				<button className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg">
					Login
				</button>
				<p className="text-md">
					Don't have an account?{" "}
					<Link to="/register" className="text-orange-400">
						Sign up here
					</Link>
				</p>
				<Link to="/register" className="text-orange-400 text-sm mt-6">
					Forgot password?
				</Link>
			</div>
		</div>
	);
}
