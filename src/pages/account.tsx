import { env } from "@/env/server.mjs";
import { Main } from "@/layouts/index";
import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth/next";
import type { ReactElement } from "react";
import AccountSettingsView from "views/AccountSettingsView";

import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};
	const url = `${env.API_URL}/users/get-single-user/${session?.user.id}/`;
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
> = ({ user }): JSX.Element => {
	return <AccountSettingsView user={user} />;
};

AccountSettingsPage.auth = true;

AccountSettingsPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default AccountSettingsPage;
