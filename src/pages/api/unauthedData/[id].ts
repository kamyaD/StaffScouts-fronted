import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const {
		method,
		query: { id, url },
	} = req;

	try {
		if (method !== "GET") {
			res.status(404).end();
		}

		return axios
			.get(`/${url}/${id}`)
			.then((response) => response.data)
			.then((data) => res.json(data));
	} catch (e: any) {
		res.status(e.response.status ?? 500).send(e);
	}
};

export default handler;
