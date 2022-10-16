import sequelize from "../database/connection";
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
	"Comment",
	{
		commentId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

export const CommentLikes = sequelize.define(
	"CommentLikes",
	{},
	{ timestamps: false }
);

export default Comment;
