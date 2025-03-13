import { Request, Response } from "express";

export default function sendUserDeletedResponseMW(_: Request, res: Response) {
	// Send response
	res.status(200).json({ message: "User deleted" });
}
