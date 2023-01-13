import { Main } from "@/layouts/index";
import { getContractTypesFn, getJobsFn } from "@/lib/api";
import JobsListingView from "@/views/JobsListing";
import type { JobListingProps } from "@/views/JobsListing/JobListing";
import type { ReactElement } from "react";

export const getStaticProps = async () => {
	const [allJobs, contractTypes] = await Promise.all([
		getJobsFn(),
		getContractTypesFn(),
	]);

	return {
		props: { allJobs, contractTypes },
	};
};

const JobsListingPage = ({ allJobs, contractTypes }: JobListingProps) => {
	return <JobsListingView allJobs={allJobs} contractTypes={contractTypes} />;
};

JobsListingPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default JobsListingPage;
