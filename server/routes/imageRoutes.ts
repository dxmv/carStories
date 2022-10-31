import express from "express";
import { BadRequest, NotFound } from "../error/HttpError";
import fs from "fs";
export const router = express.Router();
const MAIN_PATH = "D:\\JAVA SCRIPT PROJECTS\\Instagram Clone\\server\\images";

router.get("/:path/:image_id", async (req, res, next) => {
	const path = `${MAIN_PATH}\\${req.params.path}\\${req.params.image_id}`;
	try {
		if (fs.existsSync(path)) {
			res.status(200).sendFile(path);
		} else {
			throw new NotFound();
		}
	} catch (e) {
		next(e);
	}
});
