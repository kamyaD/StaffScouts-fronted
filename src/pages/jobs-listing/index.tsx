import { Main } from "@/layouts/index";
import type { ReactElement } from "react";
import JobsListingView from "@/views/JobsListing";
import type { IJobs } from "../../types";

type Props = {
	allJobs: IJobs
};

export const getStaticProps = async () => {

	const res = await fetch(`${process.env.API_URL}/jobs`)
	const allJobs = await res.json()

	return {
		props: { allJobs },
	};
};

const JobsListingPage = ({ allJobs }: Props) => {
	return <JobsListingView allJobs={allJobs} />;
};

JobsListingPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default JobsListingPage;
