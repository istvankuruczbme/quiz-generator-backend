import { Request, Response, NextFunction } from "express";

export default function errorHandlerMW(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log("Error:", err);
	res.status(500).json({ message: err.message });
}
