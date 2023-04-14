import { Main } from "@/layouts/index";
import { getContractTypesFn, getJobsFn } from "@/lib/api";
import JobListingView from "@/views/JobListing";
import type { JobListingProps } from "@/views/JobListing/JobListing";
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

const JobListingPage = ({ allJobs, contractTypes }: JobListingProps) => {
	return <JobListingView allJobs={allJobs} contractTypes={contractTypes} />;
};

JobListingPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default JobListingPage;
