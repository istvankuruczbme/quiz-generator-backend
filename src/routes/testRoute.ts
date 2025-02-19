import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { openai } from "../lib/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { stripe } from "../lib/stripe";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { db } from "../drizzle/db";
import { userTable } from "../drizzle/schema/user";
import { supabase } from "../lib/supabase";

export default function testRoute(
	fastify: FastifyInstance,
	_: FastifyPluginOptions,
	done: () => void
) {
	// Add type provider to fastify object
	const app = fastify.withTypeProvider<ZodTypeProvider>();

	// Hello World
	app.get("/hello", async () => {
		return { text: "Hello World!" };
	});

	// OpenAI API - completion
	const Answer = z.object({
		id: z.string(),
		text: z.string(),
	});
	const Question = z.object({
		text: z.string(),
		asnwers: z.array(Answer),
		correct_answer_ids: z.array(z.string()),
	});
	app.get("/completion", async () => {
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "developer",
					content: process.env.QUESTION_DEVELOPER_PROMPT!,
				},
				{
					role: "user",
					content:
						"The Pacific Ocean is the largest and deepest ocean on Earth, covering more area than all the continents combined. It stretches from the Arctic Ocean in the north to the Southern Ocean in the south and is bordered by Asia, Australia, and the Americas. The Mariana Trench, located in the western Pacific, is the deepest point in the world's oceans.",
					// "A Csendes-óceán a Föld legnagyobb és legmélyebb óceánja, amely nagyobb területet fed le, mint az összes kontinens együttvéve. Északon az Északi-sarkvidéki-óceán, délen a Déli-óceán határolja, míg nyugaton Ázsia és Ausztrália, keleten pedig Amerika partjaihoz csatlakozik. A Mariana-árok, amely a Csendes-óceán nyugati részén található, a világ óceánjainak legmélyebb pontja.",
					// "Der Pazifische Ozean ist der größte und tiefste Ozean der Erde und bedeckt eine größere Fläche als alle Kontinente zusammen. Im Norden grenzt er an den Arktischen Ozean, im Süden an den Südlichen Ozean, während er im Westen von Asien und Australien und im Osten von Amerika begrenzt wird. Der Marianengraben, der sich im westlichen Pazifik befindet, ist der tiefste Punkt der Weltmeere.",
				},
			],
			response_format: zodResponseFormat(Question, "question"),
		});

		const response = completion.choices[0].message.content || "";
		return JSON.parse(response);
	});

	// Stripe API - create customer
	const createUserschema = {
		body: z.object({
			name: z.string().min(1),
			email: z.string().email(),
		}),
		response: {
			default: z.string(),
		},
	};
	app.post("/stripe/create-customer", { schema: createUserschema }, async (req) => {
		const customer = await stripe.customers.create({
			name: req.body.name,
			email: req.body.email,
		});

		return customer.id;
	});

	// Stripe API - get user
	const getUserSchema = {
		params: z.object({
			customerId: z.string().min(1),
		}),
		// response: {
		// 	default:
		// }
	};
	app.get("/stripe/customers/:customerId", { schema: getUserSchema }, async (req) => {
		const customer = await stripe.customers.retrieve(req.params.customerId);
		return customer;
	});

	// Stripe API - checkout
	app.post("/stripe/create-checkout-session", async () => {
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			line_items: [
				{
					price: "price_1QtnyzI0V5nYyjRdU8J6hxme",
					quantity: 1,
				},
			],
			success_url: `${process.env.CLIENT_URL}/success`,
			cancel_url: `${process.env.CLIENT_URL}/error`,
		});

		return session.url;
	});

	// Stripe API - customer portal
	const getCustomerPortalSchema = {
		params: z.object({
			customerId: z.string().min(1),
		}),
		response: {
			"2xx": z.string(),
		},
	};
	app.post(
		"/stripe/customers/:customerId/portal-session",
		{ schema: getCustomerPortalSchema },
		async (req) => {
			const session = await stripe.billingPortal.sessions.create({
				customer: req.params.customerId,
				return_url: `${process.env.CLIENT_URL}/from-portal`,
			});

			return session.url;
		}
	);

	// Supabase DB - Add test user
	const addUserSchema = {
		body: z.object({
			firebaseId: z.string().length(28),
			customerId: z.string().length(18),
			name: z.string().min(1),
			email: z.string().email(),
			photoUrl: z.string().optional(),
		}),
	};
	app.post("/users", { schema: addUserSchema }, async (req) => {
		const { firebaseId, customerId, email, name } = req.body;

		const [user] = await db
			.insert(userTable)
			.values({
				firebaseId,
				customerId,
				email,
				name,
			})
			.returning();

		return user;
	});

	// Supabase Storage - add test file
	app.post("/storage", async (req) => {
		// Get file from request
		const fileData = await req.file();
		const fileBuffer = await fileData!.toBuffer();
		// console.log("File: ", file);

		// Upload file
		const path = `userId.${fileData?.filename.split(".")[1]}`;
		const { data: uploadedFile, error: uploadError } = await supabase.storage
			.from(process.env.SUPABASE_STORAGE_USER_PHOTOS_BUCKET!)
			.upload(path, fileBuffer);
		if (uploadError) throw uploadError;

		// Get file URL
		const { data } = supabase.storage
			.from(process.env.SUPABASE_STORAGE_USER_PHOTOS_BUCKET!)
			.getPublicUrl(uploadedFile.path);
		return data.publicUrl;
	});

	done();
}
