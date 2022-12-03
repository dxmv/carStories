import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Field from "../../components/AccountField/Field";
import { BsFillKeyFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { useResetPasswordMutation } from "../../redux/api/authSlice";

interface NewUser {
	old: string;
	new: string;
	newConfirm: string;
}

interface IError {
	form: string;
	old: string;
	new: string;
	newConfirm: string;
}

export default function ResetPassword() {
	const [error, setError] = useState<IError>({
		form: "",
		old: "",
		new: "",
		newConfirm: "",
	});
	const [newUser, setNewUser] = useState<NewUser>({
		old: "",
		new: "",
		newConfirm: "",
	});
	const [trigger] = useResetPasswordMutation();
	const { token } = useParams();

	const setOld = (value: string) => {
		setNewUser(prev => ({
			...prev,
			old: value,
		}));
	};

	const setNew = (value: string) => {
		setNewUser(prev => ({
			...prev,
			new: value,
		}));
	};

	const setNewConfirm = (value: string) => {
		setNewUser(prev => ({
			...prev,
			newConfirm: value,
		}));
	};

	const setOldErr = (value: string) => {
		setError(prev => ({
			...prev,
			old: value,
		}));
	};

	const setNewErr = (value: string) => {
		setError(prev => ({
			...prev,
			new: value,
		}));
	};

	const setNewConfirmErr = (value: string) => {
		setError(prev => ({
			...prev,
			new: value,
		}));
	};

	const setPassword = (
		e: React.ChangeEvent<HTMLInputElement>,
		setState: (value: string) => void,
		setErrorState: (value: string) => void
	) => {
		if (e.target.value === "") {
			return;
		}
		const res = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.exec(e.target.value);
		if (res) {
			setState(e.target.value);
			setErrorState("");
		} else {
			setErrorState(
				"Password must be at least 8 characters long, contain at least one letter and number"
			);
		}
	};
	const handleSubmit = async () => {
		if (newUser.newConfirm !== newUser.new) {
			setNewConfirmErr("This password must match with the new one");
		} else {
			setNewConfirmErr("This password must match with the new one");
		}
		if (newUser.new === newUser.old) {
			setNewErr("This password must differ from the old one");
		} else {
			setNewErr("");
		}
		try {
			await trigger({
				token: token || "",
				password: newUser.new,
				oldPassword: newUser.old,
			});
		} catch (e: unknown) {
			const message = (e as Error).message;
			setError(prev => ({ ...prev, form: message }));
		}
	};

	return (
		<div className="w-screen h-screen overflow-hidden flex justify-center items-center">
			<div className="flex flex-col items-center w-1/5 p-6 shadow-lg rounded-lg border-2  border-lighterOrange m-12">
				<h1 className="mb-1 font-bold text-3xl">RESET PASSWORD</h1>
				<p className="mb-6" style={{ color: "red" }}>
					{error.form}
				</p>
				<Field
					type="password"
					icon={<BsFillKeyFill className="absolute top-2 left-2" size={32} />}
					placeholder="Old password ..."
					error={error.old}
					value={newUser.old}
					setValue={e => {
						setPassword(e, setOld, setOldErr);
					}}
				/>
				<Field
					type="password"
					icon={<AiFillLock className="absolute top-2 left-2" size={32} />}
					placeholder="New password ..."
					error={error.new}
					value={newUser.new}
					setValue={e => {
						setPassword(e, setNew, setNewErr);
					}}
				/>
				<Field
					type="password"
					icon={<AiFillLock className="absolute top-2 left-2" size={32} />}
					placeholder="Confirm new password ..."
					error={error.newConfirm}
					value={newUser.newConfirm}
					setValue={e => {
						setPassword(e, setNewConfirm, setNewConfirmErr);
					}}
				/>
				<button
					className="mb-6 bg-darkerOrange w-1/4 p-3 font-bold text-white rounded-lg text-lg"
					onClick={handleSubmit}
				>
					RESET
				</button>
			</div>
		</div>
	);
}
