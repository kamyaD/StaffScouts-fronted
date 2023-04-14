import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import JobOpening from "@/views/JobOpening";
import type { ReactElement } from "react";

const SingleJobListingPage: NextPageWithAuthAndLayout = () => {
	return <JobOpening />;
};

SingleJobListingPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default SingleJobListingPage;
