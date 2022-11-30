import express from "express";
import multer from "multer";
import userController from "../controllers/userController";
import { profilePicturesStorage } from "../utils/images";
import passport from "passport";

export const router = express.Router();

const upload = multer({ storage: profilePicturesStorage });

// GET ALL USERS
router.get("/", async (req, res, next) => {
	try {
		const users = await userController.getAllUsers();
		res.status(200).json(users);
	} catch (e) {
		next(e);
	}
});

// GET CURRENT USER
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const current: any = req.user;
			console.log(req.user + "\n\n\n\n\n");
			const user = await userController.getUserById(current.userId);
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({
					success: false,
					message: `There is no user with ${current.userId} as the id`,
				});
			}
		} catch (e) {
			next(e);
		}
	}
);

// GET USER BY ID
router.get("/:id", async (req, res, next) => {
	try {
		const user = await userController.getUserById(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				success: false,
				message: `There is no user with ${req.params.id} as the id`,
			});
		}
	} catch (e) {
		next(e);
	}
});

// REGISTER A USER
router.post("/", upload.single("image"), async (req, res, next) => {
	try {
		const { username, email, password, bio } = req.body;
		const image = req.file;
		const user = await userController.createUser(
			username,
			email,
			password,
			bio,
			image?.filename
		);
		res.status(202).json(user);
	} catch (e) {
		next(e);
	}
});

// CHANGE USER INFO
router.put(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const newUser = await userController.editUser(
				user.userId,
				req.body.username,
				req.body.email,
				req.body.bio
			);
			res.status(202).json(newUser);
		} catch (e) {
			next(e);
		}
	}
);

// CHANGE PROFILE PICTURE
router.patch(
	"/profilePicture/",
	passport.authenticate("jwt", { session: false }),
	upload.single("image"),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const filename = req.file?.filename;
			const newUser = await userController.editProfilePicture(
				user.userId,
				filename || ""
			);
			res.status(202).json(newUser);
		} catch (e) {
			next(e);
		}
	}
);

// FOLLOW A USER
router.patch(
	"/follow/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const newUser = await userController.followUser(
				user.userId,
				req.params.id
			);
			res.status(202).json(newUser);
		} catch (e) {
			next(e);
		}
	}
);
