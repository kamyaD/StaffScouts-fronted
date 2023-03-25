import axios from "@/lib/axios";
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

	console.log("Class: , Function: handler, Line 18 req.body():", req.body);

	const body = {
		user: session?.user?.id,
		job_level: "Experienced Professional",
		county: "Nairobi",
		availability_status: 0,
		specialism_id: "[5]",
		experiences_id: 1,
		education_levels_id: 0,
		...req.body,
	};

	if (!!session) {
		switch (method) {
			case "POST":
				return axios
					.post(`/candidate/profile/create/`, body, config)
					.then((response) => response.data)
					.then((data) => res.json(data));
			case "PUT":
				return axios
					.put(
						`candidate/profile/update/${session?.user?.id}`,
						req.body,
						config,
					)
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
