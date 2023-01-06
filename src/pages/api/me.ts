import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const { method, body } = req;
	const session = await getSession({ req });

	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};

	if (!!session) {
		switch (method) {
			case "PUT":
				return axios
					.put("/users", body, config)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "GET":
				return axios
					.get(`/users/get-single-user/${session.user.id}/`, config)
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
