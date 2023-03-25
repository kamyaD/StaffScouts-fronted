import { env } from "@/env/server.mjs";
import { Main } from "@/layouts/index";
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

const AccountSettingsPage: InferGetServerSidePropsType<
	typeof getServerSideProps
> = ({ user }: { user: ICandidateProfile }): JSX.Element => {
	return (
		<div>
			<h1>{user.user.first_name}</h1>
			<h1>{user.user.username}</h1>
			<h3>{user.personal_statement}</h3>
			<h3>{user.experience}</h3>
		</div>
	);
};

AccountSettingsPage.auth = true;

AccountSettingsPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default AccountSettingsPage;
