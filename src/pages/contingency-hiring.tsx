import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";
import ContingencyHiringView from "views/ContingencyHiring";

const ContingencyHiringPage: NextPageWithAuthAndLayout = () => {
	return <ContingencyHiringView />;
};

ContingencyHiringPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default ContingencyHiringPage;
