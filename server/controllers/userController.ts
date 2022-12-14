import User, { Follow } from "../models/User";
import bcrypt from "bcrypt";
import { BadRequest, NotFound } from "../error/HttpError";

// Functions for the user route

const GET_PARAMS: string[] = [
	"followedBy",
	"following",
	"posts",
	"comments",
	"likedPosts",
	"likedComments",
];

const getAllUsers = async () =>
	await User.findAll({
		include: GET_PARAMS,
	});

const getUserById = async (id: string) =>
	await User.findByPk(id, {
		include: GET_PARAMS,
	});

const createUser = async (
	username: string,
	email: string,
	password: string,
	bio: string,
	image?: string
) => {
	// Verify the given params
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
	// Verify the given params
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
	if (!current) {
		throw new BadRequest("The user doesn't exist");
	}
	await current.setDataValue("username", username);
	await current.setDataValue("email", email);
	await current.setDataValue("bio", bio);
	await current.save();
	return current;
};

const editProfilePicture = async (id: string, filename: string) => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new BadRequest("The user doesn't exist");
	}
	await user.setDataValue("image", filename);
	await user.save();
	return getUserById(id);
};

const followUser = async (userId: string, followID: string) => {
	const follow = await Follow.findOne({
		where: { followedById: followID, followingId: userId },
	});
	if (follow) {
		await follow.destroy();
		return await getUserById(userId);
	}
	await Follow.create({ followedById: followID, followingId: userId });
	return await getUserById(userId);
};

const resetUserPassword = async (
	id: string,
	password: string,
	oldPassword: string
) => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new BadRequest("The user doesn't exist");
	}
	if (
		await !bcrypt.compare(oldPassword, await user?.getDataValue("password"))
	) {
		throw new BadRequest("The old password doesn't match");
	}
	await user.setDataValue("password", await bcrypt.hash(password, 10));
	await user.save();
	return getUserById(id);
};

export default {
	getAllUsers,
	getUserById,
	createUser,
	editUser,
	editProfilePicture,
	followUser,
	resetUserPassword,
};
