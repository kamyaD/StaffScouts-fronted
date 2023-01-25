import useRequest from "@/hooks/useRequest";
import { createCandidateJobInterestedFn } from "@/lib/api";
import type { JobInterestedDTO } from "@/lib/types";
import useStore from "@/store/index";
import { skeletonRows } from "@/utils/skeletonLoaders";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import type { IJobs, Job } from "../../../../types";

type JobStateType = "applied" | "loading" | "not-applied";

const Main = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});
	const [jobState, setJobState] = useState<JobStateType>("not-applied");
	const { displaySnackMessage } = useStore();

	const router = useRouter();

	const { data: session } = useSession();
	const jobId = router.query.id;
	const userId = session?.user.id;

	const { data: jobsInterested }: { data: IJobs | undefined } = useRequest({
		url: `/api/data/query`,
		params: {
			id: "candidate/list-jobs-interested",
		},
	});

	const buttonStates = (state: JobStateType): string => {
		switch (state) {
			case "not-applied":
				return "Show interest";
			case "loading":
				return "Applying";
			case "applied":
				return "Applied";
			default:
				return "Show interest";
		}
	};

	const { data: job, error }: { data: Job | undefined; error?: AxiosError } =
		useRequest(
			{
				url: `/api/unauthedData/${jobId}`,
				params: {
					url: "jobs",
					id: router.query.id,
				},
			},
			{ refreshInterval: 120_000 },
		);

	const { mutate: createJobInterestedIn } = useMutation(
		(jobsData: JobInterestedDTO) => createCandidateJobInterestedFn(jobsData),
		{
			onMutate() {
				setJobState(() => "loading");
			},
			onSuccess() {
				setJobState(() => "applied");
				displaySnackMessage({
					message: "Thank you for creating interest in the job.",
				});
			},
			onError(error: any) {
				setJobState(() => "not-applied");
				if (Array.isArray((error as any).response.data.error)) {
					(error as any).response.data.error.forEach((el: any) =>
						displaySnackMessage({
							message: el.message,
							severity: "error",
						}),
					);
				} else {
					displaySnackMessage({
						message: (error as any).response.data.message,
						severity: "error",
					});
				}
			},
		},
	);

	const handleUnauthenticatedUser = () => router.push("/login");

	const jobsData = {
		user_id: userId as string,
		job_id: jobId as string,
		created_at: new Date(),
		updated_at: new Date(),
	};

	const handleCandidateJobInterest = () => createJobInterestedIn(jobsData);

	return (
		<Box>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={{ xs: "flex-start", sm: "center" }}
				flexDirection={{ xs: "column", sm: "row" }}
			>
				<Box>
					{!job ? (
						skeletonRows(1)
					) : (
						<Typography fontWeight={700} variant={"h4"} gutterBottom>
							{job?.jobs_title}
						</Typography>
					)}
					{!job ? (
						skeletonRows(1)
					) : (
						<Typography variant={"h6"}>
							{!job
								? skeletonRows(1)
								: `${job?.city}, ${job.country} - ${job.contract_type_id}`}
						</Typography>
					)}
				</Box>
				<Box display="flex" marginTop={{ xs: 2, md: 0 }}>
					<LoadingButton
						fullWidth
						variant="contained"
						type="submit"
						color="primary"
						size="large"
						loading={jobState === "loading"}
						loadingPosition="start"
						disabled={jobState === "applied"}
						onClick={
							session ? handleCandidateJobInterest : handleUnauthenticatedUser
						}
					>
						{buttonStates(jobState)}
					</LoadingButton>
					{/*<Box*/}
					{/*	component={Button}*/}
					{/*	variant="outlined"*/}
					{/*	color="primary"*/}
					{/*	size="large"*/}
					{/*	marginLeft={2}*/}
					{/*>*/}
					{/*	Refer a friend*/}
					{/*</Box>*/}
				</Box>
			</Box>
			<Divider sx={{ marginY: 4 }} />
			<Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12} md={8}>
					<Box marginBottom={3}>
						<Typography variant={"h5"} fontWeight={700} gutterBottom>
							Job description
						</Typography>
						{!job ? (
							skeletonRows(3)
						) : (
							<Typography
								component={"p"}
								dangerouslySetInnerHTML={{ __html: job?.jobs_description }}
							/>
						)}
					</Box>
					<Box marginBottom={3}>
						<Typography variant={"h5"} fontWeight={700} gutterBottom>
							Duties and Responsibilities
						</Typography>
						{!job ? (
							skeletonRows(5)
						) : (
							<Typography
								component={"p"}
								dangerouslySetInnerHTML={{
									__html: job?.duties_responsibilities,
								}}
							/>
						)}
						{/*<Grid container spacing={1} sx={{ marginTop: 1 }}>*/}
						{/*	{[*/}
						{/*		"Our sign up is dead simple. We only require your basic company information",*/}
						{/*		"We support bulk uploading via SQL, integrations with most data storage products",*/}
						{/*		"Simply select where you'd like to transfer your data",*/}
						{/*		"Our sign up is dead simple. We only require your basic company information",*/}
						{/*		"We support bulk uploading via SQL, integrations with most data storage products",*/}
						{/*		"Simply select where you'd like to transfer your data",*/}
						{/*	].map((item, i) => (*/}
						{/*		<Grid item xs={12} key={i}>*/}
						{/*			<Box*/}
						{/*				component={ListItem}*/}
						{/*				disableGutters*/}
						{/*				width={"auto"}*/}
						{/*				padding={0}*/}
						{/*			>*/}
						{/*				<Box*/}
						{/*					component={ListItemAvatar}*/}
						{/*					minWidth={"auto !important"}*/}
						{/*					marginRight={2}*/}
						{/*				>*/}
						{/*					<Box*/}
						{/*						component={Avatar}*/}
						{/*						bgcolor={theme.palette.secondary.main}*/}
						{/*						width={20}*/}
						{/*						height={20}*/}
						{/*					>*/}
						{/*						<svg*/}
						{/*							width={12}*/}
						{/*							height={12}*/}
						{/*							xmlns="http://www.w3.org/2000/svg"*/}
						{/*							viewBox="0 0 20 20"*/}
						{/*							fill="currentColor"*/}
						{/*						>*/}
						{/*							<path*/}
						{/*								fillRule="evenodd"*/}
						{/*								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"*/}
						{/*								clipRule="evenodd"*/}
						{/*							/>*/}
						{/*						</svg>*/}
						{/*					</Box>*/}
						{/*				</Box>*/}
						{/*				<ListItemText primary={item} />*/}
						{/*			</Box>*/}
						{/*		</Grid>*/}
						{/*	))}*/}
						{/*</Grid>*/}
					</Box>
					<Box marginBottom={3}>
						<Typography variant={"h5"} fontWeight={700} gutterBottom>
							Job Requirements
						</Typography>
						{!job ? (
							skeletonRows(3)
						) : (
							<Typography
								component={"p"}
								dangerouslySetInnerHTML={{
									__html: job?.qualifications_competencies,
								}}
							/>
						)}
					</Box>
					{/*<Box>*/}
					{/*	<Typography variant={"h5"} fontWeight={700} gutterBottom>*/}
					{/*		Why to apply*/}
					{/*	</Typography>*/}
					{/*	<Typography component={"p"}>*/}
					{/*		We believe lorem ipsum dolor sit amet, consectetur adipiscing*/}
					{/*		elit. Phasellus feugiat elit vitae enim lacinia semper. Cras nulla*/}
					{/*		lectus, porttitor vitae urna iaculis, malesuada tincidunt lectus.*/}
					{/*		Proin nec tellus sit amet massa auctor imperdiet id vitae diam.*/}
					{/*		Aenean gravida est nec diam suscipit iaculis. Praesent urna velit,*/}
					{/*		auctor nec turpis et, vehicula lobortis sem. Vivamus convallis mi*/}
					{/*		sagittis eleifend laoreet. Praesent vitae venenatis enim. Nulla*/}
					{/*		tincidunt felis et lectus rhoncus laoreet.*/}
					{/*	</Typography>*/}
					{/*</Box>*/}
				</Grid>
				<Grid item xs={12} md={4}>
					<Grid container spacing={isMd ? 4 : 2} direction="column">
						{/*<Grid item xs={12} data-aos="fade-up">*/}
						{/*	<Box component={Card} bgcolor={"primary.main"}>*/}
						{/*		<CardContent>*/}
						{/*			<Typography*/}
						{/*				variant="h6"*/}
						{/*				gutterBottom*/}
						{/*				color="text.primary"*/}
						{/*				sx={{ color: "common.white" }}*/}
						{/*			>*/}
						{/*				You like what you’re reading?*/}
						{/*			</Typography>*/}
						{/*			<Typography*/}
						{/*				variant="subtitle1"*/}
						{/*				color="text.secondary"*/}
						{/*				sx={{ color: "common.white" }}*/}
						{/*			>*/}
						{/*				Get free online programing tips and resources delivered*/}
						{/*				directly to your inbox.*/}
						{/*			</Typography>*/}
						{/*		</CardContent>*/}
						{/*	</Box>*/}
						{/*</Grid>*/}
						{/*<Grid item xs={12} data-aos="fade-up">*/}
						{/*	<Box component={Card}>*/}
						{/*		<CardContent>*/}
						{/*			<Typography variant="h6" gutterBottom color="text.primary">*/}
						{/*				Interactive decision support system*/}
						{/*			</Typography>*/}
						{/*			<Button*/}
						{/*				variant="contained"*/}
						{/*				color="primary"*/}
						{/*				size="large"*/}
						{/*				endIcon={*/}
						{/*					<Box*/}
						{/*						component={"svg"}*/}
						{/*						xmlns="http://www.w3.org/2000/svg"*/}
						{/*						fill="none"*/}
						{/*						viewBox="0 0 24 24"*/}
						{/*						stroke="currentColor"*/}
						{/*						width={24}*/}
						{/*						height={24}*/}
						{/*					>*/}
						{/*						<path*/}
						{/*							strokeLinecap="round"*/}
						{/*							strokeLinejoin="round"*/}
						{/*							strokeWidth={2}*/}
						{/*							d="M17 8l4 4m0 0l-4 4m4-4H3"*/}
						{/*						/>*/}
						{/*					</Box>*/}
						{/*				}*/}
						{/*			>*/}
						{/*				View all*/}
						{/*			</Button>*/}
						{/*		</CardContent>*/}
						{/*	</Box>*/}
						{/*</Grid>*/}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Main;
