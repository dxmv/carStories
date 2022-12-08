// Base class
export class HttpError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequest extends HttpError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class NotFound extends HttpError {
	constructor() {
		super("Not found", 404);
	}
}

export class Forbidden extends HttpError {
	constructor(message: string) {
		super(message, 403);
	}
}
