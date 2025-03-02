import { IdResource } from "../../types/generalTypes";
import { Request } from "express";

export default function getPropertyFromRequest(
	request: Request,
	resource: IdResource,
	property: string
): unknown {
	const error = new Error(`validation/${property}-missing`);

	switch (resource) {
		case "PARAMS":
			if (!(property in request.params)) throw error;
			return request.params[property];
		case "BODY":
			if (!(property in request.body)) throw error;
			return request.body[property];
		case "QUERY":
			if (!(property in request.query)) throw error;
			return request.query[property];
	}
}
