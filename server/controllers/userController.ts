import User, { Follow } from "../models/User";
import bcrypt from "bcrypt";
import { BadRequest } from "../error/HttpError";

const getAllUsers = async () =>
	await User.findAll({
		include: ["followedBy", "following", "posts", "comments", "likedPosts"],
	});

const getUserById = async (id: string) =>
	await User.findByPk(id, {
		include: ["followedBy", "following", "posts", "comments", "likedPosts"],
	});

const createUser = async (
	username: string,
	email: string,
	password: string,
	bio: string,
	image?: string
) => {
	if (username.length <= 4 || username.length >= 20) {
		throw new BadRequest("Username length has to be between 4 and 20");
	}
	if (password.length <= 8 || password.length >= 25) {
		throw new BadRequest("Password length has to be between 8 and 25");
	}
	if (
		!email.includes("@") ||
		!email.endsWith(".com") ||
		email.startsWith("@")
	) {
		throw new BadRequest("Invalid mail");
	}

	const newPassword = await bcrypt.hash(password, 10);
	let newUser;
	if (image) {
		newUser = await User.create({
			username: username,
			email: email,
			password: newPassword,
			bio: bio,
			image: image,
		});
	} else {
		newUser = await User.create({
			username: username,
			email: email,
			password: newPassword,
			bio: bio,
		});
	}
	return newUser;
};

const editUser = async (
	id: string,
	username: string,
	email: string,
	bio: string
) => {
	if (username.length <= 4 || username.length >= 20) {
		throw new BadRequest("Username length has to be between 4 and 20");
	}
	if (
		!email.includes("@") ||
		!email.endsWith(".com") ||
		email.startsWith("@")
	) {
		throw new BadRequest("Invalid mail");
	}

	const current = await User.findByPk(id);
	await current?.setDataValue("username", username);
	await current?.setDataValue("email", email);
	await current?.setDataValue("bio", bio);
	await current?.save();
	return current;
};

const editProfilePicture = async (id: string, filename: string) => {
	const user = await User.findByPk(id);
	await user?.setDataValue("image", filename);
	await user?.save();
	return user;
};

const followUser = async (userId: string, followID: string) => {
	await Follow.create({ followedById: followID, followingId: userId });
	return await getUserById(userId);
};

const unfollowUser = async (userId: string, followID: string) => {
	await Follow.destroy({
		where: { followedById: followID, followingId: userId },
	});
	return await getUserById(userId);
};

export default {
	getAllUsers,
	getUserById,
	createUser,
	editUser,
	editProfilePicture,
	followUser,
	unfollowUser,
};
