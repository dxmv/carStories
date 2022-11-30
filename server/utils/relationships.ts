import Post from "../models/Post";
import User, { Follow, Likes } from "../models/User";
import Comment, { CommentLikes } from "../models/Comment";
import Token from "../models/Token";

const relationships = () => {
	// Comment likes
	User.belongsToMany(Comment, {
		as: "likedComments",
		through: CommentLikes,
		foreignKey: "userId",
	});

	Comment.belongsToMany(User, {
		as: "likedBy",
		through: CommentLikes,
		foreignKey: "commentId",
	});

	// User Posts
	User.hasMany(Post, { as: "posts", foreignKey: "creatorId" });
	Post.belongsTo(User, { as: "creator", foreignKey: "creatorId" });

	// Following mechanic
	User.belongsToMany(User, {
		as: "followedBy",
		through: Follow,
		foreignKey: "followedById",
	});
	User.belongsToMany(User, {
		as: "following",
		through: Follow,
		foreignKey: "followingId",
	});

	// Likes
	User.belongsToMany(Post, {
		as: "likedPosts",
		through: Likes,
		foreignKey: "userId",
	});
	Post.belongsToMany(User, {
		as: "likes",
		through: Likes,
		foreignKey: "postId",
	});

	// Comments on a post
	Post.hasMany(Comment, { as: "comments", foreignKey: "commentPostId" });
	Comment.belongsTo(Post, { as: "post", foreignKey: "commentPostId" });

	// Comments for a user
	User.hasMany(Comment, { as: "comments", foreignKey: "commentUserId" });
	Comment.belongsTo(User, { as: "author", foreignKey: "commentUserId" });

	// Reset password token
	User.hasMany(Token, { as: "tokensUser", foreignKey: "tokenId" });
	Token.belongsTo(User, { as: "user", foreignKey: "userId" });
};

export default relationships;
