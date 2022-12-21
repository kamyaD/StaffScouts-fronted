import {
	Bookmark,
	Favorite,
	LocationOn,
	PaymentsOutlined,
} from "@mui/icons-material";
import { Chip, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface JobProps {
	job: {
		image: string;
		description: string;
		title: string;
		location: string;
		offer: string;
		date: string;
		jobType: string;
	};
}

const JobCard = ({ job }: JobProps): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid item xs={12}>
			<Box
				component={Card}
				width={1}
				height={1}
				borderRadius={0}
				borderBottom={1}
				boxShadow={0}
				display={"flex"}
				flexDirection={{ xs: "column", md: "row" }}
				sx={{ backgroundImage: "none", bgcolor: "transparent" }}
			>
				<Box
					sx={{
						width: { xs: 1, md: "20%" },
						"& .lazy-load-image-loaded": {
							height: 1,
							display: "flex !important",
						},
					}}
				>
					<Box
						component={LazyLoadImage}
						height={1}
						width={1}
						src={job.image}
						alt="..."
						effect="blur"
						sx={{
							objectFit: "cover",
							maxHeight: 200,
							borderRadius: 2,
							filter:
								theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
						}}
					/>
				</Box>
				<CardContent
					sx={{
						width: { xs: 1, md: "80%" },
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<Box display={"flex"} justifyContent={"space-between"}>
						<Typography fontWeight={700}>{job.title}</Typography>
						<Box>
							<IconButton aria-label="add to favorites">
								<Favorite />
							</IconButton>
							<IconButton aria-label="share">
								<Bookmark />
							</IconButton>
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
							{job.location}
						</Box>
						<Box
							component={Button}
							variant="text"
							color="text.secondary"
							startIcon={<PaymentsOutlined />}
							sx={{ paddingY: 0, paddingLeft: 2 }}
						>
							{job.offer}
						</Box>
					</Box>
					<Typography color="text.secondary">{job.description}</Typography>
					<Box marginTop={2} display={"flex"} justifyContent={"space-between"}>
						<Box marginY={1}>
							<Chip label={job.jobType} />
						</Box>
						<Button
							variant="contained"
							endIcon={
								<Box
									component={"svg"}
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
};

export default JobCard;
