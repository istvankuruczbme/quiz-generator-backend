import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import testRoute from "./routes/testRoute";
import "dotenv/config";
import fastifyEnv from "@fastify/env";
import { envOptions } from "./lib/env";

// Create Fastify instance
const app = Fastify({
	logger: {
		transport: {
			target: "pino-pretty",
		},
	},
}).withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Initialize the app
async function initialize() {
	// Register env variables
	await app.register(fastifyEnv, envOptions);

	// Register CORS plugin
	await app.register(cors, {
		origin: process.env.CLIENT_URL,
	});

	// Register routes
	await app.register(testRoute, {
		prefix: "/api/test",
	});
}
initialize();

// Run the server
async function run() {
	try {
		// Wait until the app is ready
		await app.ready();

		// Run the server
		await app.listen({ port: Number(process.env.PORT) });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}
run();
