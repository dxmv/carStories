import { NextFunction, Request, Response } from "express";
import { HttpError } from "./HttpError";

// This is the function that is called if an error is caught in the routes

export const errorHandle = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err);
	if (err instanceof HttpError) {
		res.status(err.statusCode).json({ message: err.message });
		return;
	}
	res.status(500).json({ message: "Something broke!" });
};
