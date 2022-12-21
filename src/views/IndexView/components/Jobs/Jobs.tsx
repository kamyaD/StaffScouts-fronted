import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

import JobCard from "../../../../components/JobCard";
import fancyId from "../../../../utils/fancyId";

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

function Jobs(): JSX.Element {
	return (
		<Box>
			<Box marginBottom={4}>
				<Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
					Our latest jobs
				</Typography>
			</Box>
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
	);
}

export default Jobs;
