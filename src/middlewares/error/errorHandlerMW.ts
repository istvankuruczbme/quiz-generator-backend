import { Request, Response, NextFunction } from "express";
import { PostgresError } from "postgres";
import Stripe from "stripe";
import AppError from "../../classes/AppError";

export default function errorHandlerMW(
	error: Error,
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Log error
	console.log("Error\n:", error);

	// Check if the response was already sent
	if (res.headersSent) return next(error);

	// Stripe error
	if (error instanceof Stripe.errors.StripeError) {
		res.status(500).json({
			message: "Stripe error.",
			details: error.message,
		});
	}

	// Postgres error
	if (error instanceof PostgresError) {
		res.status(500).json({
			message: "Database error.",
			details: error.message,
		});
		return;
	}

	// App error
	if (error instanceof AppError) {
		res.status(error.status).json({
			message: error.message,
			details: error.details,
		});
		return;
	}

	// Default error
	res.status(500).json({ message: "Unknown error happened." });
}
