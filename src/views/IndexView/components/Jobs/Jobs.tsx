import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

import JobCard from "../../../../components/JobCard";
import { useGetAllJobsQuery } from "../../../../store/services/jobs";
import fancyId from "../../../../utils/fancyId";

function Jobs(): JSX.Element {
	const { data: jobs, error, isLoading } = useGetAllJobsQuery();

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
					Our latest jobs
				</Typography>
			</Box>
			<Grid container spacing={4}>
				{jobs?.slice(0, 3).map((job) => (
					<JobCard key={fancyId()} job={job} />
				))}
				{/* @ts-expect-error ignore for now */}
				{jobs?.length > 3 ? (
					<Grid item container justifyContent="center" xs={12}>
						<Button
							component={Link}
							to="/job-listing"
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
