import express from "express";
import authController from "../controllers/authController";
import passport from "passport";
export const router = express.Router();

// SEND MAIL
router.patch(
	"/sendMail",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			await authController.passwordResetMail(user.email, user.userId);
			res.status(202).json({ msg: "Email successfully sent" });
		} catch (e) {
			next(e);
		}
	}
);

// RESET PASSWORD
router.patch(
	"/resetPassword",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const newUser = await authController.resetPassword(
				user.userId,
				req.body.token,
				req.body.password,
				req.body.oldPassword
			);
			res.status(202).json(newUser);
		} catch (e) {
			next(e);
		}
	}
);
