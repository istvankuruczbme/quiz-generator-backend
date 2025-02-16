import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { openai } from "../lib/openai";

export default function testRoute(app: FastifyInstance, _: FastifyPluginOptions, done: () => void) {
	app.get("/hello", async () => {
		return { text: "Hello World!" };
	});

	app.get("/", async () => {
		const compleation = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "developer",
					content: `You are a helping assistant designed to generate multiple-choice questions with answer options (multiple can be correct).
                  Your response shall always use the following JSON format:
                  {
                     question: <QUESTION-TEXT>,
                     answers: [
                        { id: <ID>, text: <ANSWER-TEXT> },
                        ...
                     ],
                     corrects: [
                        <ID>,
                        ...
                     ]
                  }`,
				},
				{
					role: "user",
					content:
						"Text: The Pacific Ocean is the largest and deepest ocean on Earth, covering more area than all the continents combined. It stretches from the Arctic Ocean in the north to the Southern Ocean in the south and is bordered by Asia, Australia, and the Americas. The Mariana Trench, located in the western Pacific, is the deepest point in the world's oceans.",
				},
			],
		});

		return compleation.choices[0].message.content;
	});

	done();
}
