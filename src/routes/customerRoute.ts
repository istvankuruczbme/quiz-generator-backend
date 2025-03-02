import { FastifyInstance, FastifyPluginOptions } from "fastify";
import getFastifyAppWithTypeProvider from "../utils/fastify/getFastifyAppWithTypeProvider";
import { createCustomerSchema } from "../schemas/customer/createCustomerSchema";
import createCustomer from "../services/user/createCustomer";

export default function customerRoute(
	fastify: FastifyInstance,
	_: FastifyPluginOptions,
	done: () => void
) {
	// Get app from instance
	const app = getFastifyAppWithTypeProvider(fastify);

	// Create customer
	app.post("/", { schema: createCustomerSchema }, async (req) => {
		// Get name and email
		const { name, email } = req.body;

		try {
			const customer = await createCustomer(name, email);
			return customer;
		} catch (err) {
			console.log("Error creating he customer.", err);
		}
	});

	// Go to next plugin
	done();
}
