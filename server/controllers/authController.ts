import nodemailer from "nodemailer";
import { HttpError } from "../error/HttpError";

const sendMail = async (mail: string) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	transporter.sendMail(
		{
			from: process.env.EMAIL,
			to: mail,
			subject: "Password change request",
			text: "Password change link",
		},
		err => {
			if (err) {
				throw new HttpError(err.message, 400);
			}
		}
	);
};

export default { sendMail };
