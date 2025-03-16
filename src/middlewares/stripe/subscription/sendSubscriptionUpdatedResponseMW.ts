import { Request, Response } from "express";

export default function sendSubscriptionUpdatedResponseMW(_: Request, res: Response) {
	res.status(200).json({ message: "Subscription updated." });
}
