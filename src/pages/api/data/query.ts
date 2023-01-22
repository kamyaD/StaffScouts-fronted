import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const { method } = req;
	const session = await getSession({ req });

	const config = {
		headers: {
			Authorization: `Token ${session?.user?.token}`,
		},
	};

	if (!!session) {
		try {
			if (method !== "GET") {
				res.status(404).end();
			}

			if (req.query.id) {
				const url = `${process.env.API_URL}/${req.query.id}`;

				return fetch(url, config)
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
