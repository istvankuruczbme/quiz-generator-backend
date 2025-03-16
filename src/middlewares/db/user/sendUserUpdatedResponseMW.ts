import { Request, Response } from "express";

export default function sendUserUpdatedResponseMW(_: Request, res: Response) {
	res.status(200).json({ message: "User updated." });
}
