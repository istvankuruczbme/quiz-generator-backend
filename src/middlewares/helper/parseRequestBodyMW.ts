import { Request, Response, NextFunction } from "express";

export default function parseRequestBodyMW(req: Request, _: Response, next: NextFunction) {
	// Get data from request body
	const { data } = req.body as { data: unknown };

	try {
		// Validation
		if (data == undefined || typeof data !== "string") {
			throw new Error("request/body-invalid");
		}

		// Update request body with parsed JSON
		req.body = JSON.parse(data);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
