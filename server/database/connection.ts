import { Sequelize } from "sequelize";

// Connecting with a postgres database

const sequelize = new Sequelize(
	process.env.DATABASE_NAME || "",
	process.env.DATABASE_USERNAME || "",
	process.env.DATABASE_PASSWORD || "",
	{
		host: process.env.DATABASE_HOST || "",
		dialect: "postgres",
		logging: false,
	}
);

export default sequelize;
