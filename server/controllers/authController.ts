import nodemailer from "nodemailer";
import { BadRequest, HttpError } from "../error/HttpError";
import Token from "../models/Token";
import bcrypt from "bcrypt";
import userController from "./userController";

// Functions for the auth route

// Sending a mail with gmail using nodemailer
const sendMail = async (mail: string, subject: string, text: string) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	await transporter.sendMail(
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
		tokenHash: await (await bcrypt.hash(`${mail}-${id}`, 10)).replace("/", ""),
	});
	await sendMail(
		mail,
		"Password reset request",
		`Password reset link:\n${
			process.env.FRONT_END
		}/reset_password/${token.getDataValue("tokenHash")}`
	);
};

const resetPassword = async (
	id: string,
	token: string,
	password: string,
	oldPassword: string
) => {
	const resetToken = await Token.findOne({
		where: { tokenHash: token, userId: id },
	});
	if (!resetToken) {
		throw new BadRequest("This token doesn't exist");
	}
	const user = await userController.resetUserPassword(
		id,
		password,
		oldPassword
	);
	await resetToken.destroy();
	return user;
};

export default { passwordResetMail, resetPassword };
