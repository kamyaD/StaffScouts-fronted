import { Main } from "@/layouts/index";
import { getContractTypesFn, getJobsFn } from "@/lib/api";
import type { HomeProps } from "@/views/IndexView/IndexView";
import type { ReactElement } from "react";
import HomeView from "views/IndexView";

export const getStaticProps = async () => {
	const [allJobs, contractTypes] = await Promise.all([
		getJobsFn(),
		getContractTypesFn(),
	]);

	const jobs = allJobs.results.slice(0, 3);

	return {
		props: { jobs, contractTypes },
	};
};

const HomePage = ({ jobs, contractTypes }: HomeProps) => {
	return <HomeView jobs={jobs} contractTypes={contractTypes} />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default HomePage;
