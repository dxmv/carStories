import sequelize from "../database/connection";
const { DataTypes } = require("sequelize");

// User, follow and likes models

const User = sequelize.define(
	"User",
	{
		userId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			defaultValue: "default.jpg",
		},
		bio: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: "users",
	}
);

export const Follow = sequelize.define("Follow", {}, { timestamps: false });
export const Likes = sequelize.define("Likes", {}, { timestamps: false });

export default User;
