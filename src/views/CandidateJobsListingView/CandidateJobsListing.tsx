import useRequest from "@/hooks/useRequest";
import type { AxiosError } from "axios";
import Container from "components/Container";

import type { IJobs } from "../../types";
import { JobsListing, SidebarFilters } from "./components";

const CandidateJobsListing = (): JSX.Element => {
	const { data: jobs, error }: { data: IJobs | undefined; error?: AxiosError } =
		useRequest(
			{
				url: "/api/unauthedData",
				params: {
					id: "jobs",
				},
			},
			{ refreshInterval: 120_000 },
		);

	const { data: specialisms }: { data: IJobs | undefined } = useRequest(
		{
			url: "/api/unauthedData",
			params: {
				id: "jobs/list-specialism",
			},
		},
		{ refreshInterval: 120_000 },
	);

	return (
		<>
			<Container>
				<SidebarFilters
					specialisms={specialisms}
					jobsCount={jobs?.count as number}
				>
					<JobsListing jobs={jobs} />
				</SidebarFilters>
			</Container>
		</>
	);
};

export default CandidateJobsListing;
