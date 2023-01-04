import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import type { ReactElement } from "react";
import LoginView from "views/Login";

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
};

// @ts-ignore
const LoginPage: NextPageWithAuthAndLayout = ({ csrfToken }) => {
	return <LoginView csrfToken={csrfToken} />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default LoginPage;
