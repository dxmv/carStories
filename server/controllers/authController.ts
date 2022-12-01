import nodemailer from "nodemailer";
import { BadRequest, HttpError, NotFound } from "../error/HttpError";
import Token from "../models/Token";
import bcrypt from "bcrypt";
import User from "../models/User";
import userController from "./userController";

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
		tokenHash: await bcrypt.hash(`${mail}-${id}`, 10),
	});
	await sendMail(
		mail,
		"Password reset request",
		`Password reset link:\n${
			process.env.FRONT_END
		}/resetPassword/${token.getDataValue("tokenHash")}`
	);
};

const resetPassword = async (id: string, token: string, password: string) => {
	const resetToken = await Token.findOne({
		where: { tokenHash: token, userId: id },
	});
	if (!resetToken) {
		throw new BadRequest("This token doesn't exist");
	}
	return userController.resetUserPassword(id, password);
};

export default { passwordResetMail, resetPassword };
