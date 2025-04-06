import { Request, Response } from "express";

export default function returnPdfTextMW(_: Request, res: Response) {
	// Get text from res.locals
	const { text, tokens } = res.locals as { text: string; tokens: Uint32Array<ArrayBufferLike> };

	// Send text
	res.status(200).json({ tokens });
}
