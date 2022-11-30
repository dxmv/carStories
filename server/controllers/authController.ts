import nodemailer from "nodemailer";
import { HttpError } from "../error/HttpError";
import Token from "../models/Token";
import bcrypt from "bcrypt";

const sendMail = async (mail: string, subject: string, text: string) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	transporter.sendMail(
		{
			from: process.env.EMAIL,
			to: mail,
			subject: subject,
			text: text,
		},
		err => {
			if (err) {
				throw new HttpError(err.message, 400);
			}
		}
	);
};

const passwordResetMail = async (mail: string, id: string) => {
	const token = await Token.create({
		userId: id,
		tokenHash: await bcrypt.hash(`${mail}-${id}`, 10),
	});
	await sendMail(
		mail,
		"Password reset request",
		`Password reset link:\n${token.getDataValue("tokenHash")}`
	);
};

export default { passwordResetMail };
