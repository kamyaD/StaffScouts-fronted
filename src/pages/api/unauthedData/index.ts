import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const { method } = req;

	try {
		if (method !== "GET") {
			res.status(404).end();
		}

		if (req.query.id) {
			const url = `${process.env.API_URL}/${req.query.id}`;

			return fetch(url)
				.then((response) => response.json())
				.then((data) => res.json(data));
		}
		return;
	} catch (e: any) {
		res.status(e.response?.status ?? 500).send(e);
	}
};

export default handler;
