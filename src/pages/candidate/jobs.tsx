import { Dashboard } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import CandidateJobsListing from "@/views/CandidateJobsListingView";
import type { ReactElement } from "react";

const CandidatesPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <CandidateJobsListing />;
};

CandidatesPage.auth = true;

CandidatesPage.getLayout = (page: ReactElement) => (
	<Dashboard>{page}</Dashboard>
);

export default CandidatesPage;
