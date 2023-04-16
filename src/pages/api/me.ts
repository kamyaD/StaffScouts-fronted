import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./auth/[...nextauth]";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const { method, body } = req;
	const session = await getServerSession(req, res, authOptions);

	const config = {
		headers: {
			Authorization: `Token ${session?.user?.token}`,
		},
	};

	if (!!session) {
		switch (method) {
			case "PUT":
				return axios
					.put(
						`${process.env.API_URL}/users/update-user/${session?.user?.id}/`,
						body,
						config,
					)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "GET":
				return axios
					.get(
						`${process.env.API_URL}/candidate/profile/${session?.user?.id}`,
						config,
					)
					.then((response) => response.data)
					.then((data) => res.json(data));
		}
	} else {
		res.status(401).send({
			error: "You must be signed in to make a request to this endpoint.",
		});
	}
};

export default handler;
