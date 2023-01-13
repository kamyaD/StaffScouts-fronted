import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const { firstName, lastName, userName, password, confirmPassword, email } =
		req.body;

	const body = {
		email,
		password,
		password2: confirmPassword,
		first_name: firstName,
		last_name: lastName,
		username: userName,
		bio: "",
		city: "",
		country: "",
		job_title: "",
		availability_status: "",
		is_employer: false,
		is_candidate: false,
		is_both_employer_and_candidate: false,
		profile_pic:
			"https://res.cloudinary.com/mashafrancis/image/upload/v1670917120/musings/illustrations/avatar.svg",
	};

	try {
		await axios.post("/users/register/", body);
		res.status(200).end();
	} catch (e: any) {
		res.status(400).send(e);
	}
};

export default handler;
