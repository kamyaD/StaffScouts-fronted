import axios from "@lib/axios";
import environment from "@lib/environment";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const {
		method,
		query: { id, url },
	} = req;
	const session = await getSession({ req });

	const config = {
		headers: {
			Authorization: `Api-Token ${environment.apiToken}`,
		},
	};

	if (!!session) {
		try {
			if (method !== "GET") {
				res.status(404).end();
			}

			const endpoint = `https://krr89478.live.dynatrace.com/api/v2/${url}/${id}`;

			return axios
				.get(endpoint, config)
				.then((response) => response.data)
				.then((data) => res.json(data));
		} catch (e: any) {
			res.status(e.response.status ?? 500).send(e);
		}
	}
};

export default handler;
