// Loading environment variables
import "dotenv/config";
// Packages
import express from "express";
import cors from "cors";
// Routes
import { productRoute } from "./routes/productRoute";
import { stripeWebhookRoute } from "./routes/stripeWebhookRoute";
import { categoryRoute } from "./routes/categoryRoute";
import { userRoute } from "./routes/userRoute";
import { quizRoute } from "./routes/quizRoute";
import { quizConfigRoute } from "./routes/quizConfigRoute";
import { questionRoute } from "./routes/questionRoute";
import { completionRoute } from "./routes/completionRoute";
import { completionQuestionRoute } from "./routes/completionQuestionRoute";
// Functions
import errorHandlerMW from "./middlewares/error/errorHandlerMW";
import freeTokenizer from "./utils/tokenizer/freeTokenizer";

// Create Express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: process.env.CLIENT_URL })); // Enable requests only from the client

// Routes
app.use("/api/products", productRoute);
app.use("/api/stripe/webhook", stripeWebhookRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/quizzes", quizRoute);
app.use("/api/quizzes/:quizId/config", quizConfigRoute);
app.use("/api/quizzes/:quizId/questions", questionRoute);
app.use("/api/quizzes/:quizId/completions", completionRoute);
app.use("/api/quizzes/:quizId/completions/:completionId/questions", completionQuestionRoute);

// Error handler
app.use(errorHandlerMW);

// Run the server
const server = app.listen(process.env.PORT!, () => {
	console.log("Listening on port", process.env.PORT!);
});

// Clean up encoder on shutdown
process.on("SIGINT", () => {
	console.log("Shutting down...");
	freeTokenizer();
	server.close(() => process.exit(0));
});
