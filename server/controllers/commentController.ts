import { BadRequest, Forbidden } from "../error/HttpError";
import Comment, { CommentLikes } from "../models/Comment";

// Functions for the comment route

const GET_PARAMS: string[] = ["author", "post", "likedBy"];

const getAllComments = async () =>
	await Comment.findAll({ include: GET_PARAMS });

const getById = async (id: string) =>
	await Comment.findByPk(id, { include: GET_PARAMS });

const createComment = async (text: string, userId: string, postId: string) => {
	if (text.length < 1) {
		throw new BadRequest("Text length should be more than 1 character");
	}
	const comment = await Comment.create({
		text: text,
		commentUserId: userId,
		commentPostId: postId,
	});
	return comment;
};

const editComment = async (text: string, userId: string, commentId: string) => {
	if (text.length < 1) {
		throw new BadRequest("Text length should be more than 1 character");
	}
	const comment = await Comment.findByPk(commentId);
	// Checking if this comment belongs to a user
	if (comment?.getDataValue("commentUserId") != userId) {
		throw new Forbidden("You didn't make this comment");
	}
	await comment.setDataValue("text", text);
	await comment.save();
	return comment;
};

const deleteComment = async (commentId: string, userId: string) => {
	const comment = await Comment.findByPk(commentId);
	// Checking if this comment belongs to a user
	if (comment?.getDataValue("commentUserId") != userId) {
		throw new Forbidden("You didn't make this comment");
	}
	await comment.destroy();
};

const likeComment = async (commentId: string, userId: string) => {
	const like = await CommentLikes.findOne({
		where: { commentId: commentId, userId: userId },
	});
	// If the comment is liked destroy the entry in CommentLikes database
	if (like) {
		await like.destroy();
		return await Comment.findByPk(commentId);
	}
	await CommentLikes.create({ commentId: commentId, userId: userId });
	return await Comment.findByPk(commentId);
};

export default {
	getAllComments,
	getById,
	createComment,
	editComment,
	deleteComment,
	likeComment,
};
