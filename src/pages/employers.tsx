import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";
import EmployersView from "views/Employers";

const EmployersPage: NextPageWithAuthAndLayout = () => {
	return <EmployersView />;
};

EmployersPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default EmployersPage;
