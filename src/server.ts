import Fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import testRoute from "./routes/testRoute";
import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";
import { envOptions } from "./lib/env";
import multipart from "@fastify/multipart";

// Create Fastify instance
const app = Fastify({
	logger: {
		transport: {
			target: "pino-pretty",
		},
	},
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Register plugins
app.register(fastifyEnv, envOptions);
app.register(cors, {
	origin: process.env.CLIENT_URL,
});
app.register(multipart);

// Register routes
app.register(testRoute, {
	prefix: "/api/test",
});

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
