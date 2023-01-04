import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import RegisterView from "@/views/Register";
import type { ReactElement } from "react";

const RegisterPage: NextPageWithAuthAndLayout = () => {
	return <RegisterView />;
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default RegisterPage;
