import { Request, Response } from "express";

export default function sendQuizDeletedResponseMW(_: Request, res: Response) {
	res.status(200).json({ message: "Quiz deleted." });
}
