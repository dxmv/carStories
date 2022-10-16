import multer from "multer";

export const profilePicturesStorage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, "./images/profilePictures");
	},
	filename(req, file, callback) {
		callback(null, Date.now() + "." + file.originalname.split(".").pop());
	},
});

export const postImageStorage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, "./images/posts");
	},
	filename(req, file, callback) {
		callback(null, Date.now() + "." + file.originalname.split(".").pop());
	},
});
