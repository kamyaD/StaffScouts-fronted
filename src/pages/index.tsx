import { Main } from "@/layouts/index";
import type { ReactElement } from "react";
import HomeView from "views/IndexView";
import { IJobs, Job } from "../types";

type Props = {
	allJobs: IJobs
};

export const getStaticProps = async () => {
	const res = await fetch(`${process.env.API_URL}/jobs`)
	const allJobs: IJobs = await res.json()
	const jobs = allJobs.results.slice(0, 3)

	return {
		props: { jobs },
	};
};

const HomePage = ({ jobs }: { jobs: Array<Job> }) => {
	return <HomeView jobs={jobs} />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default HomePage;
