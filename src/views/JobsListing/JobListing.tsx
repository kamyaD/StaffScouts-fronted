import { Search } from "@mui/icons-material";
import { Button, Divider, IconButton, InputBase, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { Link } from "react-router-dom";

import Container from "../../components/Container";
import JobCard from "../../components/JobCard";
import fancyId from "../../utils/fancyId";

const mock = [
	{
		image: "/img/head-hunting.png",
		description:
			"We are hiring an Associate Sales Director under our Farm Star brand, where we sell and market our Evergrow Organic Fertilizers, Kuzapro Insect Based Animal Protein, and Evermoto biomass briquettes. The Associate Director will have full responsibility for product sales by providing strategic leadership and operational oversight to the Farm Star Country Sales teams, the Sales & Marketing Excellence team and the Sales Enablement team.",
		title: "Associate sales director",
		location: "Nairobi, Kenya",
		offer: "Ksh25,000",
		date: "10 Sep",
		jobType: "Contract",
	},
	{
		image: "/img/head-hunting.png",
		description:
			"The company is looking for a strategic and innovative Procurement & Warehouse Manager (Project Manager Supply Chain) to effectively lead and own execution of projects within the Warehouse and Procurement functions.",
		title: "Procurement and warehouse manager",
		location: "Nairobi, Kenya",
		offer: "Ksh25,000",
		date: "02 Aug",
		jobType: "Contract",
	},
	{
		image: "/img/head-hunting.png",
		description:
			"StaffScout is looking to change how employers and candidates think about recruitment. StaffScout would like to make the job application process as simple and visible as possible through the use of our platform, https://www.staffscout.co.ke/..",
		title: "Digital Marketing & Sales Intern",
		location: "Nairobi, Kenya",
		offer: "Ksh25,000",
		date: "05 Mar",
		jobType: "Contract",
	},
];

function JobListing(): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
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
									/>
									<Typography
										color="text.secondary"
										variant="subtitle2"
										sx={{ whiteSpace: "nowrap" }}
									>
										123 Results
									</Typography>
									<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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

								{/* <Box */}
								{/*	padding={2} */}
								{/*	width={1} */}
								{/*	component={Card} */}
								{/*	boxShadow={4} */}
								{/*	marginBottom={4} */}
								{/*	variant="outlined" */}
								{/* > */}
								{/*	<form noValidate autoComplete="off"> */}
								{/*		<Box display="flex" alignItems={"center"}> */}
								{/*			<Box width={1} marginRight={1}> */}
								{/*				<TextField */}
								{/*					sx={{ */}
								{/*						height: 54, */}
								{/*						"& .MuiOutlinedInput-notchedOutline": { */}
								{/*							border: "0 !important", */}
								{/*						}, */}
								{/*					}} */}
								{/*					variant="outlined" */}
								{/*					color="primary" */}
								{/*					size="medium" */}
								{/*					placeholder="Search an article" */}
								{/*					fullWidth */}
								{/*					InputProps={{ */}
								{/*						startAdornment: ( */}
								{/*							<InputAdornment position="start"> */}
								{/*								<Box */}
								{/*									component={"svg"} */}
								{/*									xmlns="http://www.w3.org/2000/svg" */}
								{/*									fill="none" */}
								{/*									viewBox="0 0 24 24" */}
								{/*									stroke="currentColor" */}
								{/*									width={24} */}
								{/*									height={24} */}
								{/*									color={"text.secondary"} */}
								{/*								> */}
								{/*									<path */}
								{/*										strokeLinecap="round" */}
								{/*										strokeLinejoin="round" */}
								{/*										strokeWidth={2} */}
								{/*										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" */}
								{/*									/> */}
								{/*								</Box> */}
								{/*							</InputAdornment> */}
								{/*						), */}
								{/*					}} */}
								{/*				/> */}
								{/*			</Box> */}
								{/*			<Box */}
								{/*				display={{ xs: "none", sm: "block" }} */}
								{/*				marginRight={2} */}
								{/*			> */}
								{/*				<Typography */}
								{/*					color={"text.secondary"} */}
								{/*					variant={"subtitle2"} */}
								{/*					sx={{ whiteSpace: "nowrap" }} */}
								{/*				> */}
								{/*					123 Results */}
								{/*				</Typography> */}
								{/*			</Box> */}
								{/*			<Box> */}
								{/*				<Button */}
								{/*					sx={{ */}
								{/*						height: 54, */}
								{/*						minWidth: 100, */}
								{/*						whiteSpace: "nowrap", */}
								{/*					}} */}
								{/*					variant="contained" */}
								{/*					color="primary" */}
								{/*					size="medium" */}
								{/*					fullWidth */}
								{/*				> */}
								{/*					Search */}
								{/*				</Button> */}
								{/*			</Box> */}
								{/*		</Box> */}
								{/*	</form> */}
								{/* </Box> */}
							</Box>
							{/* <Box */}
							{/*	sx={{ */}
							{/*		width: "100%", */}
							{/*		background: theme.palette.background.paper, */}
							{/*		[theme.breakpoints.up("md")]: { */}
							{/*			position: "absolute", */}
							{/*			bottom: 0, */}
							{/*			transform: "translateY(100%)", */}
							{/*		}, */}
							{/*		"& .MuiOutlinedInput-notchedOutline": { */}
							{/*			border: "0 !important", */}
							{/*		}, */}
							{/*	}} */}
							{/* > */}
							{/*	<FormControl fullWidth variant="outlined" data-aos="fade-up"> */}
							{/*		<OutlinedInput */}
							{/*			sx={{ */}
							{/*				background: theme.palette.background.paper, */}
							{/*				boxShadow: 4, */}
							{/*			}} */}
							{/*			startAdornment={ */}
							{/*				<InputAdornment position="start"> */}
							{/*					<Box */}
							{/*						component={"svg"} */}
							{/*						xmlns="http://www.w3.org/2000/svg" */}
							{/*						fill="none" */}
							{/*						viewBox="0 0 24 24" */}
							{/*						stroke="currentColor" */}
							{/*						width={24} */}
							{/*						height={24} */}
							{/*					> */}
							{/*						<path */}
							{/*							strokeLinecap="round" */}
							{/*							strokeLinejoin="round" */}
							{/*							strokeWidth={2} */}
							{/*							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" */}
							{/*						/> */}
							{/*					</Box> */}
							{/*				</InputAdornment> */}
							{/*			} */}
							{/*		/> */}
							{/*	</FormControl> */}
							{/* </Box> */}
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
										src="https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration1.svg"
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
			<Container>
				<Box>
					<Grid container spacing={4}>
						{mock.map((job) => (
							<JobCard key={fancyId()} job={job} />
						))}
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
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default JobListing;
