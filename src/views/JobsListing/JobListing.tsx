import useRequest from "@/hooks/useRequest";
import { Search } from "@mui/icons-material";
import {
	Button,
	Divider,
	IconButton,
	InputBase,
	Pagination,
	Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { AxiosError } from "axios";
import { useState } from "react";

import Container from "../../components/Container";
import JobCard from "../../components/JobCard";
import type { IJobs, Job } from "../../types";
import type { ContractType, PaginatedResults } from "../../types";
import fancyId from "../../utils/fancyId";

const JOBS_PER_PAGE = 10;

export interface JobListingProps {
	allJobs: IJobs;
	contractTypes: {
		results: ContractType[];
	} & PaginatedResults;
}

function JobListing({ allJobs, contractTypes }: JobListingProps): JSX.Element {
	const [searchValue, setSearchValue] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	const { data: jobs, error }: { data: IJobs | undefined; error?: AxiosError } =
		useRequest(
			{
				url: "/api/unauthedData",
				params: {
					id: "jobs",
				},
			},
			{ refreshInterval: 120_000, fallbackData: allJobs },
		);

	const initialDisplayJobs = jobs?.results;

	if (!jobs) {
		return <div>Loading</div>;
	}

	if (error) {
		return <div>Error fetching jobs</div>;
	}

	const filteredJobs = initialDisplayJobs?.filter((job) => {
		const searchContent = job.jobs_title + job.jobs_description;
		return searchContent.toLowerCase().includes(searchValue.toLowerCase());
	});

	// If initialDisplayPosts exist, display it if no searchValue is specified
	const displayJobs =
		(initialDisplayJobs?.length as number) > 0 && !searchValue
			? initialDisplayJobs
			: filteredJobs;

	const contract = contractTypes?.results,
		contractObject = contract?.reduce(
			// @ts-expect-error
			(r, { id, contract_types_name }) => ((r[id] = contract_types_name), r),
			{},
		);

	const modifiedJobs = displayJobs?.map((job) => {
		// @ts-expect-error
		return {
			...job,
			contract_type_id: contractObject[job.contract_type_id as string],
		};
	});

	return (
		<>
			<Box bgcolor="alternate.main" padding={{ xs: 2, md: 4 }} borderRadius={2}>
				<Container>
					<Grid container spacing={4}>
						<Grid
							item
							container
							xs={12}
							md={6}
							alignItems="center"
							sx={{ position: "relative" }}
						>
							<Box data-aos={isMd ? "fade-right" : "fade-up"} marginBottom={4}>
								<Box marginBottom={2}>
									<Typography
										variant="h3"
										component="h3"
										sx={{
											fontWeight: 700,
										}}
									>
										Jobs board listing
									</Typography>
								</Box>
								<Box marginBottom={3}>
									<Typography variant="h6" component="p" color="text.secondary">
										Productivity tools can either help you or get in the way.
									</Typography>
								</Box>

								<Paper
									component="form"
									noValidate
									autoComplete="off"
									sx={{
										p: "2px 4px",
										display: "flex",
										alignItems: "center",
										width: "auto",
									}}
								>
									<IconButton sx={{ p: "10px" }} aria-label="menu">
										<Search />
									</IconButton>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Search jobs"
										inputProps={{ "aria-label": "search google maps" }}
										onChange={({ target }) => setSearchValue(target.value)}
									/>
									<Typography
										color="text.secondary"
										variant="subtitle2"
										sx={{ whiteSpace: "nowrap" }}
									>
										{`${filteredJobs?.length} Results`}
									</Typography>
									<Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
									<Button
										sx={{
											height: 54,
											minWidth: 50,
											whiteSpace: "nowrap",
										}}
										variant="contained"
										color="primary"
										size="medium"
									>
										Search
									</Button>
								</Paper>
							</Box>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box height={1} width={1} display="flex" justifyContent="center">
								<Box
									height={1}
									width={1}
									maxWidth={{ xs: 600, md: "100%" }}
									maxHeight={500}
								>
									<Box
										component="img"
										src="/img/jobs-listing.svg"
										width={1}
										height={1}
										sx={{
											filter:
												theme.palette.mode === "dark"
													? "brightness(0.8)"
													: "none",
										}}
									/>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
			{parseInt(jobs?.count as string) > 1 && !searchValue && (
				<Container>
					<Box>
						<Grid container spacing={4}>
							{modifiedJobs?.map((job: Job) => (
								<JobCard key={fancyId()} job={job} />
							))}
							<Grid item container justifyContent="center" xs={12}>
								<Pagination
									count={
										(jobs?.count as number) / (jobs?.results.length as number)
									}
									page={page}
									variant="outlined"
									color="primary"
									// onChange={handlePageChange}
								/>
							</Grid>
						</Grid>
					</Box>
				</Container>
			)}
		</>
	);
}

export default JobListing;
