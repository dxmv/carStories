import express from "express";
import commentController from "../controllers/commentController";
export const router = express.Router();
import passport from "passport";
import { nextTick } from "process";

// GET ALL COMMENTS
router.get("/", async (req, res, next) => {
	try {
		const comments = await commentController.getAllComments();
		res.status(202).json(comments);
	} catch (e) {
		next(e);
	}
});

// GET COMMENT BY ID
router.get("/:id", async (req, res, next) => {
	try {
		const comment = await commentController.getById(req.params.id);
		res.status(200).json(comment);
	} catch (e) {
		next(e);
	}
});

// CREATE A COMMENT
router.post(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			console.log("a");
			const user: any = req.user;
			const comment = await commentController.createComment(
				req.body.text,
				user.userId,
				req.params.id
			);
			res.status(202).json(comment);
		} catch (e) {
			next(e);
		}
	}
);

// CHANGE TEXT
router.patch(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const post = await commentController.editComment(
				req.body.text,
				user.userId,
				req.params.id
			);
			res.status(202).json(post);
		} catch (e) {
			next(e);
		}
	}
);

// LIKE COMMENT
router.patch(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			const comment = await commentController.likeComment(
				req.params.id,
				user.userId
			);
			res.status(200).json(comment);
		} catch (e) {
			next(e);
		}
	}
);

// DELETE POST
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			await commentController.deleteComment(req.params.id, user.userId);
			res.status(200).json({ msg: "Deleted successfully" });
		} catch (e) {
			next(e);
		}
	}
);
