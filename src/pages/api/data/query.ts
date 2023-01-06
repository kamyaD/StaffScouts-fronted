import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import queryString from "query-string";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const { method } = req;
	const session = await getSession({ req });

	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};

	if (!!session) {
		try {
			if (method !== "GET") {
				res.status(404).end();
			}

			if (req.query.id) {
				const url = `http://127.0.0.1:8000/${req.query.id}`;
				console.log("Class: , Function: handler, Line 26 url():", url);
				const queryParams = queryString.stringify(req.query, {
					skipEmptyString: true,
					skipNull: true,
				});
				const endpoint = `${url}?${queryParams}`;

				return fetch(endpoint, config)
					.then((response) => response.json())
					.then((data) => res.json(data));
			}
			return;
		} catch (e: any) {
			res.status(e.response?.status ?? 500).send(e);
		}
	} else {
		res.status(401).send({
			error: "You must be signed in to make a request to this endpoint.",
		});
	}
};

export default handler;
