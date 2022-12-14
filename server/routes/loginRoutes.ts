import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequest, NotFound } from "../error/HttpError";
export const router = express.Router();

// LOGIN USER
router.post("/", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username: username } });
		// Checking if a user with the username doesn't exist
		if (!user) {
			throw new BadRequest("User with that username doesn't exits");
		}
		const correctPassword = await bcrypt.compare(
			password,
			await user.getDataValue("password")
		);
		// Checking if the password is correct
		if (!correctPassword) {
			throw new BadRequest("Incorrect password");
		}
		const token = jwt.sign(
			{ id: await user.getDataValue("userId"), username: username },
			process.env.JWT_SECRET || "secret",
			{ expiresIn: "1d" }
		);
		res.status(202).json({
			token: `Bearer ${token}`,
			id: await user.getDataValue("userId"),
		});
	} catch (e) {
		next(e);
	}
});
