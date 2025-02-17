import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { openai } from "../lib/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export default function testRoute(app: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
	app.get("/hello", async () => {
		return { text: "Hello World!" };
	});

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

	done();
}
