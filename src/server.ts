import "dotenv/config";
import express from "express";
import cors from "cors";
import { subscriptionRoute } from "./routes/subscriptionRoute";
import { categoryRoute } from "./routes/categoryRoute";
import { userRoute } from "./routes/userRoute";
import errorHandlerMW from "./middlewares/error/errorHandlerMW";

// Create Fastify instance
const app = express();

// Middlewares
app.use(express.json()); // Convert JSON requests
app.use(cors({ origin: process.env.CLIENT_URL })); // Enable requests only from the client

// Routes
app.use("/api/subscriptions", subscriptionRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);

// Error handler
app.use(errorHandlerMW);

// Run the server
app.listen(process.env.PORT!, () => {
	console.log("Listening on port", process.env.PORT!);
});
