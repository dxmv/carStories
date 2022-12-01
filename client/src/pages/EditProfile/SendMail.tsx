import React, { useState } from "react";
import { useSendResetMailMutation } from "../../redux/api/authSlice";

export default function SendMail() {
	const [emailSent, setEmailSent] = useState<boolean>(false);
	const [trigger] = useSendResetMailMutation();

	const handleSend = async () => {
		try {
			await trigger();
		} catch (e) {
			return;
		}
		await setEmailSent(true);
	};

	return (
		<div>
			<p className="font-bold text-2xl border-b-2 mb-4 pb-2">Reset password</p>
			{emailSent ? (
				<p>Email with reset password link sent. Check your mail.</p>
			) : (
				<button className="bg-blue-500 p-2 rounded-md" onClick={handleSend}>
					Click here to reset your password
				</button>
			)}
		</div>
	);
}
