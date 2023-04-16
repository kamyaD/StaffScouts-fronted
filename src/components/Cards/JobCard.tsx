import dayjsTime from "@/utils/dayjsTime";
import stripHtml from "@/utils/stripHtml";
// import stripHtml from "@/utils/stripHtml";
import { Bookmark, Favorite, LocationOn } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Str from "@supercharge/strings";
import { useRouter } from "next/router";

import type { Job } from "../../types";

interface JobProps {
	job: Job;
}

function JobCard({
	job: {
		id,
		jobs_title,
		jobs_description,
		country,
		offered_salary,
		contract_type_id,
		city,
		application_deadline,
		created_at,
	},
}: JobProps): JSX.Element {
	const theme = useTheme();

	const jobDescription = Str(stripHtml(jobs_description).toString())
		.limit(200, "...")
		.get();

	const { push } = useRouter();

	return (
		<Grid
			item
			xs={12}
			sx={{ padding: "0 !important", cursor: "pointer", marginBottom: 1 }}
			onClick={() => push(`/job-listing/${id}`)}
		>
			<Box
				component={Card}
				padding={0}
				width={1}
				height={1}
				borderRadius={0}
				// borderBottom={1}
				boxShadow={0}
				display="flex"
				flexDirection={{ xs: "column", md: "row" }}
				sx={{
					backgroundImage: "none",
					bgcolor: "transparent",
					border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					borderRadius: 2,
					padding: 3,
					":hover": {
						bgcolor: alpha(theme.palette.primary.main, 0.1),
						color: theme.palette.primary.dark,
					},
				}}
			>
				{/* <CardMedia */}
				{/*	component="img" */}
				{/*	sx={{ */}
				{/*		width: { xs: 1, md: "25%" }, */}
				{/*		height: 1, */}
				{/*		borderRadius: 2, */}
				{/*		objectFit: "cover", */}
				{/*		maxHeight: 200, */}
				{/*	}} */}
				{/*	image="/img/head-hunting.png" */}
				{/*	alt="Live from space album cover" */}
				{/* /> */}
				{/* <Box */}
				{/*	sx={{ */}
				{/*		width: { xs: 1, md: "20%" }, */}
				{/*		"& .lazy-load-image-loaded": { */}
				{/*			height: 1, */}
				{/*			display: "flex !important", */}
				{/*		}, */}
				{/*	}} */}
				{/* > */}
				{/*	<Box */}
				{/*		component={LazyLoadImage} */}
				{/*		height={1} */}
				{/*		width={1} */}
				{/*		src={job.image} */}
				{/*		alt="..." */}
				{/*		effect="blur" */}
				{/*		sx={{ */}
				{/*			objectFit: "cover", */}
				{/*			maxHeight: 200, */}
				{/*			borderRadius: 2, */}
				{/*			filter: */}
				{/*				theme.palette.mode === "dark" ? "brightness(0.7)" : "none", */}
				{/*		}} */}
				{/*	/> */}
				{/* </Box> */}
				<CardContent
					sx={{
						// width: { xs: 1, md: "80%" },
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						padding: "0 !important",
					}}
				>
					<Box display="flex" justifyContent="space-between">
						<Typography variant="h5" fontWeight={700}>
							{jobs_title}
						</Typography>
						<Box>
							<Tooltip title="Like">
								<IconButton aria-label="add to favorites">
									<Favorite />
								</IconButton>
							</Tooltip>
							<Tooltip title="Save">
								<IconButton aria-label="bookmark">
									<Bookmark />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
					<Stack
						marginY={1}
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						spacing={2}
					>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ paddingY: 0, paddingRight: 1 }}
						>
							{contract_type_id}
						</Typography>
						{"|"}
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ paddingY: 0, paddingRight: 1 }}
						>
							Est. Salary: {offered_salary}
						</Typography>
						{"|"}
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ paddingY: 0 }}
						>
							Posted: {dayjsTime(created_at).fromNow()}
						</Typography>
					</Stack>
					<Typography variant="body1" color="text.primary">
						{jobDescription}
					</Typography>
					<Box marginTop={2} display="flex" justifyContent="space-between">
						<Stack
							marginY={0}
							direction="row"
							justifyContent="flex-start"
							alignItems="center"
							spacing={2}
						>
							<Box
								component={Button}
								variant="text"
								color="text.secondary"
								startIcon={<LocationOn />}
								sx={{ paddingY: 0, paddingX: 0 }}
							>
								{`${city}, ${country}`}
							</Box>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ paddingY: 0 }}
							>
								Deadline: {dayjsTime(application_deadline).format("YYYY-MM-DD")}
							</Typography>
						</Stack>
					</Box>
				</CardContent>
			</Box>
		</Grid>
	);
}

export default JobCard;
