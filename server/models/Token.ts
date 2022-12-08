import sequelize from "../database/connection";
const { DataTypes } = require("sequelize");

// Token model, used for changing the password

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
