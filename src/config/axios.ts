import axios from "axios";

const instance = axios.create({
	baseURL: process.env.EMBEDDING_SERVER_URL,
});

export { instance as axios };
