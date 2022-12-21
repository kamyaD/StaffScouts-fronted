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

const mock = [
	{
		image: "https://assets.maccarianagency.com/backgrounds/img21.jpg",
		description:
			"We are hiring an Associate Sales Director under our Farm Star brand, where we sell and market our Evergrow Organic Fertilizers, Kuzapro Insect Based Animal Protein, and Evermoto biomass briquettes. The Associate Director will have full responsibility for product sales by providing strategic leadership and operational oversight to the Farm Star Country Sales teams, the Sales & Marketing Excellence team and the Sales Enablement team.",
		title: "Associate sales director",
		author: {
			name: "Clara Bertoletti",
			avatar: "https://assets.maccarianagency.com/avatars/img1.jpg",
		},
		location: "Nairobi, Kenya",
		offer: "Ksh25,000",
		date: "10 Sep",
		jobType: "Contract",
	},
	{
		image: "https://assets.maccarianagency.com/backgrounds/img22.jpg",
		description:
			"The company is looking for a strategic and innovative Procurement & Warehouse Manager (Project Manager Supply Chain) to effectively lead and own execution of projects within the Warehouse and Procurement functions.",
		title: "Procurement and warehouse manager",
		author: {
			name: "Jhon Anderson",
			avatar: "https://assets.maccarianagency.com/avatars/img2.jpg",
		},
		location: "Nairobi, Kenya",
		offer: "Ksh25,000",
		date: "02 Aug",
		jobType: "Contract",
	},
	{
		image: "https://assets.maccarianagency.com/backgrounds/img23.jpg",
		description:
			"StaffScout is looking to change how employers and candidates think about recruitment. StaffScout would like to make the job application process as simple and visible as possible through the use of our platform, https://www.staffscout.co.ke/..",
		title: "Digital Marketing & Sales Intern",
		author: {
			name: "Chary Smith",
			avatar: "https://assets.maccarianagency.com/avatars/img3.jpg",
		},
		location: "Nairobi, Kenya",
		offer: "Ksh25,000",
		date: "05 Mar",
		jobType: "Contract",
	},
];

const Jobs = (): JSX.Element => {
	const theme = useTheme();

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography variant={"h4"} gutterBottom sx={{ fontWeight: 700 }}>
					Our latest jobs
				</Typography>
			</Box>
			<Grid container spacing={4}>
				{mock.map((item, i) => (
					<Grid item xs={12} key={i}>
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
									src={item.image}
									alt="..."
									effect="blur"
									sx={{
										objectFit: "cover",
										maxHeight: 200,
										borderRadius: 2,
										filter:
											theme.palette.mode === "dark"
												? "brightness(0.7)"
												: "none",
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
									<Typography fontWeight={700}>{item.title}</Typography>
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
										{item.location}
									</Box>
									<Box
										component={Button}
										variant="text"
										color="text.secondary"
										startIcon={<PaymentsOutlined />}
										sx={{ paddingY: 0, paddingLeft: 2 }}
									>
										{item.offer}
									</Box>
								</Box>
								<Typography color="text.secondary">
									{item.description}
								</Typography>
								<Box
									marginTop={2}
									display={"flex"}
									justifyContent={"space-between"}
								>
									<Box marginY={1}>
										<Chip label={item.jobType} />
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
				))}
				<Grid item container justifyContent={"center"} xs={12}>
					<Button
						variant={"contained"}
						size={"large"}
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
						View all
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Jobs;
