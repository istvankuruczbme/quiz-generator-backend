import { ZodError } from "zod";

export default function getZodErrorMessages(error: ZodError): string {
	return error.issues.map((issue) => issue.message).join("\n");
}
