import { Request, Response } from "express";

export default function sendQuestionDeletedResponseMW(_: Request, res: Response) {
	res.status(200).json({ message: "Question deleted." });
}
