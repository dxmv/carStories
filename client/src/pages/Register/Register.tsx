import React, { useState } from "react";
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import { RegisterState } from "./registerTypes";
import { useCreateUserMutation } from "../../redux/api/userSlice";

export default function Register() {
	const [page, setPage] = useState<number>(1);
	const [user, setUser] = useState<RegisterState>({
		username: "",
		email: "",
		password: "",
		bio: "",
		image: null,
	});
	const [trigger] = useCreateUserMutation();

	const nextPage = () => {
		if (page === 3) {
			return;
		}
		setPage(prev => prev + 1);
	};

	const prevPage = () => {
		if (page === 1) {
			return;
		}
		setPage(prev => prev - 1);
	};

	const handleSubmit = async () => {
		try {
			const formData = new FormData();
			formData.append("username", user.username);
			formData.append("password", user.password);
			formData.append("email", user.email);
			formData.append("bio", user.bio);
			formData.append("image", user.image || "");
			await trigger(formData);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="w-screen h-screen overflow-hidden flex justify-center items-center">
			<div className="flex flex-col items-center w-1/5  p-6 shadow-xl rounded-lg border-2">
				<h1 className="mb-3 font-bold text-3xl">Logo</h1>
				<h1 className="mb-3 font-bold text-xl">Sign up</h1>
				<div
					id="progress-bar"
					className="w-4/5 h-1 mb-6 rounded-lg bg-gray-600 relative"
				>
					<div
						id="progress"
						className="bg-orange-400 h-full absolute top-0 left-0"
						style={{ width: `${(100 / 3) * (page - 1)}%` }}
					></div>
				</div>
				{page === 1 ? (
					<FirstPage user={user} setUser={setUser} goToNextPage={nextPage} />
				) : page === 2 ? (
					<SecondPage
						nextPage={nextPage}
						prevPage={prevPage}
						user={user}
						setUser={setUser}
					/>
				) : (
					<ThirdPage
						prevPage={prevPage}
						user={user}
						setUser={setUser}
						submit={handleSubmit}
					/>
				)}

				<p className="text-md">
					Already have an account?{" "}
					<Link to="/login" className="text-orange-400">
						Log in here
					</Link>
				</p>
			</div>
		</div>
	);
}
