import axios from "@/lib/axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	const {
		firstName,
		lastName,
		userName,
		password,
		confirmPassword,
		email,
		userType,
	} = req.body;

	const body = {
		user: {
			email,
			password,
			password2: confirmPassword,
			first_name: firstName,
			last_name: lastName,
			username: userName,
		},
		availability_status: "0",
		is_employer: userType === "employer",
		is_candidate: userType === "candidate",
		is_both_employer_and_candidate: userType === "Both Candidate & Employer",
		experiences_id: "1",
		education_levels_id: "5",
		// profile_pic:
		// 	"https://res.cloudinary.com/mashafrancis/image/upload/v1670917120/musings/illustrations/avatar.svg",
	};

	try {
		await axios.post("/users/register/", body);
		res.status(200).end();
	} catch (e: any) {
		res.status(400).send(e);
	}
};

export default handler;
