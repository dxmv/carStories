import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Route imports
import { router as userRoutes } from "./routes/userRoutes";
import { router as loginRoutes } from "./routes/loginRoutes";
import { router as postRoutes } from "./routes/postRoutes";
import { router as commentRoutes } from "./routes/commentRoutes";
import { router as imageRoutes } from "./routes/imageRoutes";

import sequelize from "./database/connection";
import bodyParser from "body-parser";
import passport from "passport";
import relationships from "./utils/relationships";
import { errorHandle } from "./error/errorHandle";

const app = express();

// Database setup
sequelize
	.authenticate()
	.then(() => console.log("Database connected"))
	.catch(e => console.log(e));
// sequelize.sync({ force: true }).then(() => console.log("Created database"));
relationships();

// Body parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
// Cors
app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE",
		allowedHeaders: "*",
		credentials: true,
	})
);

// Passport
app.use(passport.initialize());
require("./utils/passportConfig");

// Routes
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/images", imageRoutes);
app.use(errorHandle);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port: ${process.env.PORT}`);
});
