import React, { useState } from "react";
import Field from "../../components/AccountField/Field";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useChangeUserInfoMutation } from "../../redux/api/userSlice";
import { setUser as setUserRedux } from "../../redux/userSlice";

interface EditProfileUser {
	username: string;
	email: string;
	bio: string;
}

interface EditProfileError {
	usernameError: string;
	emailError: string;
	form: string;
}

export default function EditProfile() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(state => state.user.user);
	const [user, setUser] = useState<EditProfileUser>({
		username: currentUser?.username || "",
		email: currentUser?.email || "",
		bio: currentUser?.bio || "",
	});
	const [error, setError] = useState<EditProfileError>({
		usernameError: "",
		emailError: "",
		form: "",
	});
	const [trigger] = useChangeUserInfoMutation();

	const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			return;
		}
		const res = /^[a-z0-9_.]{3,15}$/.exec(e.target.value);
		if (res) {
			setUser(prev => {
				return { ...prev, username: e.target.value };
			});
			setError(prev => {
				return { ...prev, usernameError: "" };
			});
		} else {
			setError(prev => {
				return {
					...prev,
					usernameError: "Username must be between 3 and 16 characters",
				};
			});
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

	const handleSubmit = async () => {
		if (
			error.usernameError !== "" ||
			error.emailError !== "" ||
			error.form !== ""
		) {
			return;
		}
		// PATCH REQUEST
		try {
			const res = await trigger(user).unwrap();
			dispatch(setUserRedux(res));
		} catch {
			setError(prev => ({ ...prev, form: "There was an error" }));
		}
		// dispatch
	};
	return (
		<div className="w-screen flex justify-center items-center p-12">
			<div className="rounded-md w-3/5 border-2 p-5">
				<div>
					<p className="font-bold text-2xl border-b-2 mb-4 pb-2">
						Edit your profile
					</p>
					<div className="grid grid-cols-2 mb-2">
						<Field
							type="text"
							icon={
								<AiOutlineUser className="absolute top-2 left-2" size={32} />
							}
							placeholder="Username ..."
							value={user.username}
							error={error.usernameError}
							setValue={setUsername}
						/>
						<Field
							type="email"
							icon={
								<AiOutlineMail className="absolute top-2 left-2" size={32} />
							}
							placeholder="Email ..."
							value={user.email}
							error={error.emailError}
							setValue={setEmail}
						/>
					</div>
					<textarea
						className="text-lg w-full shadow-lg border-2 mb-4 p-3 rounded-lg "
						placeholder={"Tell us about yourself..."}
						style={{
							resize: "none",
						}}
						rows={10}
						defaultValue={user.bio}
						onChange={e => setUser(prev => ({ ...prev, bio: e.target.value }))}
					/>
					<button
						className="bg-blue-500 p-2 rounded-md mb-4"
						onClick={handleSubmit}
					>
						Edit user
					</button>
				</div>
				<div>
					<p className="font-bold text-2xl border-b-2 mb-4 pb-2">
						Reset password
					</p>
					<button className="bg-blue-500 p-2 rounded-md">
						Click here to reset your password
					</button>
				</div>
			</div>
		</div>
	);
}
