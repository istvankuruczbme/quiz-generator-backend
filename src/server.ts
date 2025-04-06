import "dotenv/config";
import express from "express";
import cors from "cors";
import { productRoute } from "./routes/productRoute";
import { stripeWebhookRoute } from "./routes/stripeWebhookRoute";
import { categoryRoute } from "./routes/categoryRoute";
import { userRoute } from "./routes/userRoute";
import { quizRoute } from "./routes/quizRoute";
import { questionRoute } from "./routes/questionRoute";
import errorHandlerMW from "./middlewares/error/errorHandlerMW";
import freeTokenizer from "./utils/tokenizer/freeTokenizer";

// Create Fastify instance
const app = express();

// Middlewares
app.use(express.json()); // Convert JSON requests
app.use(cors({ origin: process.env.CLIENT_URL })); // Enable requests only from the client

// Routes
app.use("/api/products", productRoute);
app.use("/api/stripe/webhook", stripeWebhookRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/quizzes", quizRoute);
app.use("/api/quizzes/:quizId/questions", questionRoute);

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
