import Container from "@/components/Container";
import JobCard from "@/components/JobCard";
import useRequest from "@/hooks/useRequest";
import { Main } from "@/layouts/index";
import { getContractTypesFn } from "@/lib/api";
import fancyId from "@/utils/fancyId";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { ReactElement } from "react";

import type { ContractType, IJobs, Job, PaginatedResults } from "../types";

interface Props {
	contractTypes: {
		results: ContractType[];
	} & PaginatedResults;
}

export const getServerSideProps = async () => {
	const [contractTypes] = await Promise.all([getContractTypesFn()]);

	return {
		props: { contractTypes },
	};
};

const ContingencyHiringPage = ({ contractTypes }: Props) => {
	const { data: allJobs }: { data: IJobs | undefined } = useRequest({
		url: `/api/data/query`,
		params: {
			id: "candidate/list-jobs-interested",
		},
	});

	const contract = contractTypes?.results,
		contractObject = contract?.reduce(
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{},
		);

	const modifiedJobs = allJobs?.map((job) => {
		return {
			...job,
			contract_type_id: contractObject[job.contract_type_id],
		};
	});

	return (
		<Container>
			<Box>
				<Grid container spacing={4}>
					{modifiedJobs?.map((job: Job) => (
						<JobCard key={fancyId()} job={job} />
					))}
				</Grid>
			</Box>
		</Container>
	);
};

ContingencyHiringPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default ContingencyHiringPage;
