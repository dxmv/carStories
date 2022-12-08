import sequelize from "../database/connection";
const { DataTypes } = require("sequelize");

const Post = sequelize.define(
	"Post",
	{
		postId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		caption: {
			type: DataTypes.STRING,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Post;
