import express from "express";
import multer from "multer";
import postController from "../controllers/postController";
export const router = express.Router();
import { postImageStorage } from "../utils/images";
import passport from "passport";

const upload = multer({ storage: postImageStorage });

// GET ALL POSTS
router.get("/", async (req, res, next) => {
	try {
		const posts = await postController.getAllPosts();
		res.status(202).json(posts);
	} catch (e) {
		next(e);
	}
});

// GET POST BY ID
router.get("/:id", async (req, res, next) => {
	try {
		const post = await postController.getPostById(req.params.id);
		if (!post) {
			res.status(404).json(`No post with id ${req.params.id}`);
			return;
		}
		res.status(200).json(post);
	} catch (e) {
		next(e);
	}
});

// CREATE A POST
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	upload.single("image"),
	async (req, res, next) => {
		try {
			const image = req.file?.filename;
			const caption = req.body.caption;
			const user: any = req.user;
			const post = await postController.createPost(
				image || "default.jpg",
				caption,
				user.userId
			);
			res.status(202).json(post);
		} catch (e) {
			next(e);
		}
	}
);

// CHANGE CAPTION
router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const caption = req.body.caption;
			const user: any = req.user;
			const post = await postController.editPost(
				req.params.id,
				caption,
				user.userId
			);
			res.status(202).json(post);
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
			await postController.deletePost(req.params.id, user.userId);
			res.status(200).json({ msg: "Deleted successfully" });
		} catch (e) {
			next(e);
		}
	}
);

// LIKE A POST
router.patch(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user: any = req.user;
			await postController.likePost(user.userId, req.params.id);
			res.status(200).json({ msg: "Success" });
		} catch (e) {
			next(e);
		}
	}
);
