import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import JobCard from "../../../../components/JobCard";
import fancyId from "../../../../utils/fancyId";
import type { Job } from "../../../../types";

function Jobs({ jobs }: { jobs: Array<Job> }): JSX.Element {
	return (
		<Box>
			<Box marginBottom={4}>
				<Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
					Our latest jobs
				</Typography>
			</Box>
			<Grid container spacing={4}>
				{jobs.map((job) => (
					<JobCard key={fancyId()} job={job} />
				))}
				{(jobs?.length as number) > 3 ? (
					<Grid item container justifyContent="center" xs={12}>
						<Button
							component={Link}
							href="/jobs-listing"
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
