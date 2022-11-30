import sequelize from "../database/connection";
const { DataTypes } = require("sequelize");

const Token = sequelize.define(
	"Token",
	{
		tokenHash: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "tokens",
	}
);

export default Token;
