import dayjsTime from "@/utils/dayjsTime";
import stripHtml from "@/utils/stripHtml";
import {
	Bookmark,
	Favorite,
	LocationOn,
	PaymentsOutlined,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Grid,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Str from "@supercharge/strings";
import Link from "next/link";

import type { Job } from "../types";

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
		.limit(300, "...")
		.get();

	return (
		<Grid item xs={12}>
			<Box
				component={Card}
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
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
								<IconButton aria-label="share">
									<Bookmark />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
					<Box marginY={1}>
						<Box
							component={Button}
							variant="text"
							color="text.secondary"
							startIcon={<LocationOn />}
							sx={{ paddingY: 0, paddingX: 0 }}
						>
							{`${city}, ${country}`}
						</Box>
						<Box
							component={Button}
							variant="text"
							color="text.secondary"
							startIcon={<PaymentsOutlined />}
							sx={{ paddingY: 0, paddingLeft: 2 }}
						>
							{offered_salary}
						</Box>
					</Box>
					<Typography color="text.secondary">{jobDescription}</Typography>
					<Box marginTop={2} display="flex" justifyContent="space-between">
						<Box marginY={1}>
							<Chip label={contract_type_id} />
							<Chip
								variant="outlined"
								label={`Posted: ${dayjsTime(created_at).fromNow()}`}
								sx={{
									marginLeft: 2,
								}}
							/>
							<Chip
								variant="outlined"
								label={`Deadline: ${dayjsTime(application_deadline).format(
									"YYYY-MM-DD",
								)}`}
								sx={{
									marginLeft: 2,
								}}
							/>
						</Box>
						<Button
							variant="contained"
							component={Link}
							href={`/jobs-listing/${id}`}
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
							Read More
						</Button>
					</Box>
				</CardContent>
			</Box>
		</Grid>
	);
}

export default JobCard;
