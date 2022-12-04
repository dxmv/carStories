import React, { useState } from "react";
import Field from "../../components/AccountField/Field";
import { BsFillKeyFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RegisterState } from "./registerTypes";

interface ErrorState {
	usernameError: string;
	emailError: string;
	passwordError: string;
}

export default function FirstPage({
	user,
	setUser,
	goToNextPage,
}: {
	user: RegisterState;
	setUser: React.Dispatch<React.SetStateAction<RegisterState>>;
	goToNextPage: () => void;
}) {
	const [error, setError] = useState<ErrorState>({
		usernameError: "",
		emailError: "",
		passwordError: "",
	});

	const nextPage = async () => {
		console.log(user);
		if (user.username === "") {
			await setError(prev => {
				return { ...prev, usernameError: "Username must not be empty" };
			});
			return;
		}
		if (user.password === "") {
			await setError(prev => {
				return { ...prev, passwordError: "Password must not be empty" };
			});
			return;
		}
		if (user.email === "") {
			await setError(prev => {
				return { ...prev, emailError: "Email must not be empty" };
			});
			return;
		}
		console.log(error);
		if (
			error.usernameError !== "" ||
			error.emailError !== "" ||
			error.passwordError !== ""
		) {
			return;
		}

		goToNextPage();
	};

	const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			return;
		}
		if (e.target.value.length < 4 || e.target.value.length > 16) {
			setError(prev => ({
				...prev,
				usernameError: "Username must be between 4 and 16 characters",
			}));
		} else {
			setUser(prev => ({
				...prev,
				username: e.target.value,
			}));
			setError(prev => ({
				...prev,
				usernameError: "",
			}));
		}
	};

	const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			return;
		}
		const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(e.target.value);
		if (res) {
			setUser(prev => {
				return { ...prev, email: e.target.value };
			});
			setError(prev => {
				return { ...prev, emailError: "" };
			});
		} else {
			setError(prev => {
				return {
					...prev,
					emailError: "Email must match the pattern",
				};
			});
		}
	};

	const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			return;
		}
		const res = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.exec(e.target.value);
		if (res) {
			setUser(prev => {
				return { ...prev, password: e.target.value };
			});
			setError(prev => {
				return { ...prev, passwordError: "" };
			});
		} else {
			setError(prev => {
				return {
					...prev,
					passwordError:
						"Password must be at least 8 characters long, contain at least one letter and number  ",
				};
			});
		}
	};

	return (
		<>
			<Field
				type="text"
				icon={<AiOutlineUser className="absolute top-2 left-2" size={32} />}
				placeholder="Username ..."
				value={user.username}
				error={error.usernameError}
				setValue={setUsername}
			/>
			<Field
				type="email"
				icon={<AiOutlineMail className="absolute top-2 left-2" size={32} />}
				placeholder="Email ..."
				value={user.email}
				error={error.emailError}
				setValue={setEmail}
			/>
			<Field
				type="password"
				icon={<BsFillKeyFill className="absolute top-2 left-2" size={32} />}
				placeholder="Password ..."
				value={user.password}
				error={error.passwordError}
				setValue={setPassword}
			/>
			<button
				className="mb-6 bg-orange-400 w-1/4 p-3 font-bold text-white rounded-lg text-lg"
				onClick={nextPage}
			>
				NEXT
			</button>
		</>
	);
}
