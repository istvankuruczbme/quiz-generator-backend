import { Request, Response } from "express";

export default function sendQuestionUpdatedResponseMW(_: Request, res: Response) {
	res.status(200).json({ message: "Question updated." });
}
