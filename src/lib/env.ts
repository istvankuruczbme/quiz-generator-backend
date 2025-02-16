const schema = {
	type: "object",
	required: ["PORT", "CLIENT_URL", "OPENAI_API_KEY"],
	properties: {
		PORT: {
			type: "number",
			default: 3000,
		},
		CLIENT_URL: {
			type: "string",
		},
		OPENAI_API_KEY: {
			type: "string",
		},
	},
};

export const envOptions = {
	schema,
	dotenv: true,
	data: process.env,
};
