import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const {
		method,
		query: { url },
		body,
	} = req;
	const session = await getSession({ req });

	const config = {
		headers: {
			Authorization: `Token ${session?.user?.token}`,
		},
	};

	if (!!session) {
		switch (method) {
			case "POST":
				return axios
					.post(`/${url}/`, body, config)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "PUT":
				return axios
					.put(`/${url}/`, body.payload, config)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "DELETE":
				return axios
					.delete(`/${url}/`, config)
					.then(() => res.send({ message: "Schedule deleted successfully." }));
			default:
				res.setHeader("Allow", ["delete", "put", "post"]);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	}
};

export default handler;
