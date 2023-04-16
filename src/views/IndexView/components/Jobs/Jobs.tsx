import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import Link from "next/link";

import type { ContractType, Job } from "../../../../types";
import fancyId from "../../../../utils/fancyId";

const JobCard = dynamic(() => import("../../../../components/JobCard"), {
	ssr: false,
});

function Jobs({
	jobs,
	contractTypes,
}: {
	jobs: Array<Job>;
	contractTypes: ContractType[];
}): JSX.Element {
	const contract = contractTypes,
		contractObject = contract.reduce(
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{},
		);

	const modifiedJobs = jobs.map((job) => {
		return {
			...job,
			// @ts-expect-error
			contract_type_id: contractObject[job.contract_type_id as string],
		};
	});

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{ fontWeight: 700 }}
					align="center"
				>
					Our latest jobs
				</Typography>
			</Box>
			<Grid
				container
				spacing={4}
				marginY={4}
				justifyContent="center"
				alignItems="center"
			>
				{modifiedJobs.map((job) => (
					<JobCard key={fancyId()} job={job} />
				))}
				{(modifiedJobs?.length as number) >= 3 ? (
					<Grid item container justifyContent="center" xs={12}>
						<Button
							component={Link}
							href="/job-listing"
							variant="contained"
							size="large"
							endIcon={
								<Box
									component="svg"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									width={24}
									height={24}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</Box>
							}
						>
							View all
						</Button>
					</Grid>
				) : null}
			</Grid>
		</Box>
	);
}

export default Jobs;
