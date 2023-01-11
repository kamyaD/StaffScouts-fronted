import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";
import JobsListingView from "@/views/JobsListing";

const JobsListingPage: NextPageWithAuthAndLayout = () => {
	return <JobsListingView />;
};

JobsListingPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default JobsListingPage;
