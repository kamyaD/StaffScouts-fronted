import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const {
		method,
		query: { id, url },
		body,
	} = req;
	const session = await getSession({ req });

	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};

	if (!!session) {
		switch (method) {
			case "GET":
				return axios
					.get(`/${url}/${id}`, config)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "PUT":
				return axios
					.put(`/${url}/${id}`, body.payload, config)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "DELETE":
				return axios
					.delete(`/${url}/${id}`, config)
					.then(() => res.send({ message: "Schedule deleted successfully." }));
			default:
				res.setHeader("Allow", ["delete", "put"]);
				res.status(405).end(`Method blah ${method} Not Allowed`);
		}
	}
};

export default handler;
