import { Forbidden } from "../error/HttpError";
import Post from "../models/Post";
import { Likes } from "../models/User";

const getAllPosts = async () =>
	await Post.findAll({ include: ["creator", "likes", "comments"] });

const getPostById = async (id: string) =>
	await Post.findByPk(id, { include: ["creator", "likes", "comments"] });

const createPost = async (image: string, caption: string, userId?: string) => {
	const post = await Post.create({
		image: image,
		caption: caption,
		creatorId: userId,
	});
	return post;
};

const editPost = async (id: string, caption: string, userId: string) => {
	const post = await Post.findByPk(id);
	if (post?.getDataValue("creatorId") != userId) {
		throw new Forbidden("You can't change the post you didn't create");
	}
	await post?.setDataValue("caption", caption);
	await post?.save();
	return post;
};

const deletePost = async (id: string, userId: string) => {
	const post = await Post.findByPk(id);
	if (post?.getDataValue("creatorId") != userId) {
		throw new Forbidden("You can't delete the post you didn't create");
	}
	await post?.destroy();
};

const likePost = async (userId: string, postId: string) => {
	const like = await Likes.findOne({
		where: { userId: userId, postId: postId },
	});
	if (like) {
		await like.destroy();
		return;
	}
	await Likes.create({ userId: userId, postId: postId });
	return await getPostById(postId);
};

export default {
	getAllPosts,
	getPostById,
	createPost,
	editPost,
	deletePost,
	likePost,
};
