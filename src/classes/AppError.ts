import { AppError as AppErrorType } from "../types/errorTypes";

export default class AppError extends Error {
	// Properties
	status: number;
	details?: string;

	constructor(error: AppErrorType) {
		// Error properties
		const { message, details, status } = error;

		// Construct error
		super(message);
		this.name = this.constructor.name;
		this.details = details;
		this.status = status || 500;

		// Fixing prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}
