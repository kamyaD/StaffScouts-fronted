import { env } from "@/env/server.mjs";
import { Main } from "@/layouts/index";
import Profile from "@/views/Profile/Profile";
import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import type { ReactElement } from "react";

import type { ICandidateProfile } from "../types";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getServerSession(req, res, authOptions);
	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};
	const url = `${env.API_URL}/candidate/profile/${session?.user.id}`;
	const response = await fetch(url, config);
	const user = await response.json();

	return {
		props: {
			user,
		},
	};
};

const ProfilePage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
	user,
}: {
	user: ICandidateProfile;
}): JSX.Element => {
	return <Profile user={user} />;
};

ProfilePage.auth = true;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default ProfilePage;
