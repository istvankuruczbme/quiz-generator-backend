import { Request, Response } from "express";

export default function sendQuizUpdatedResponseMW(_: Request, res: Response) {
	res.status(200).json({ message: "Quiz updated." });
}
