import {
	BugReportTwoTone,
	CenterFocusStrongTwoTone,
	StreamTwoTone,
	WebhookTwoTone,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
/* eslint-disable react/no-unescaped-entities */
import React from "react";

import fancyId from "../../../../utils/fancyId";

const mock = [
	{
		title: "Cognitive ability",
		subtitle: "Cognitive ability – To measure problem-solving ability.",
		icon: <CenterFocusStrongTwoTone fontSize="large" color="action" />,
	},
	{
		title: "Personality testing",
		subtitle: "Peek into how a person interacts with the world..",
		icon: <BugReportTwoTone fontSize="large" color="action" />,
	},
	{
		title: "Aptitude testing",
		subtitle: "Applicants ability to learn a new skill.",
		icon: <WebhookTwoTone fontSize="large" color="action" />,
	},
	{
		title: "Honesty and Integrity Tests",
		subtitle:
			"Measure an applicant’s propensity toward undesirable behaviors such as lying, stealing, taking drugs or abusing alcohol..",
		icon: <StreamTwoTone fontSize="large" color="action" />,
	},
];

function PreScreening(): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	function LeftSide() {
		return (
			<>
				<Box marginBottom={4}>
					<Box marginBottom={2}>
						<Typography variant="h6" align="left" sx={{ fontWeight: 600 }}>
							Screening tests
						</Typography>
					</Box>
					<Typography variant="body2" component="p" align="left">
						A hunch, instinct or a gut feeling can only take you so far and is
						not scalable. Let Staff Scout to go beyond the suggestion the CV
						offers and KNOW for sure if a candidate is the right fit for your
						organization.
					</Typography>
				</Box>
				<List disablePadding>
					{mock.map((item, index) => (
						<ListItem
							key={fancyId()}
							disableGutters
							data-aos="fade-up"
							data-aos-delay={index * 300}
							data-aos-offset={100}
							data-aos-duration={600}
						>
							<ListItemAvatar>
								<Box
									component={Avatar}
									width={60}
									height={60}
									marginRight={2}
									bgcolor={alpha(theme.palette.primary.main, 0.3)}
									color={theme.palette.primary.main}
									variant="rounded"
									borderRadius={2}
								>
									{item.icon}
								</Box>
							</ListItemAvatar>
							<ListItemText primary={item.title} secondary={item.subtitle} />
						</ListItem>
					))}
				</List>

				<Box marginY={4}>
					<Box marginBottom={2}>
						<Typography variant="h6" align="left" sx={{ fontWeight: 600 }}>
							Pre-employment interviews
						</Typography>
					</Box>
					<Typography variant="body2" component="p" align="left">
						Staff Scout offers pre-employment interview services to the
						shortlisted applicants on behalf of our clients. The interview
						questions are tailored to each position and industry. All questions
						are sent and evaluated by the client.
					</Typography>
				</Box>
			</>
		);
	}

	function RightSide() {
		return ["Kes 5000", "Kes 3000"].map((item, i) => (
			<Grid item xs={12} key={fancyId()}>
				<Box
					component={Card}
					padding={4}
					width={1}
					height={1}
					data-aos="fade-up"
					data-aos-delay={i * 100}
					data-aos-offset={100}
					data-aos-duration={600}
					variant="outlined"
				>
					<Box display="flex" flexDirection="column">
						<Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
							{item}
						</Typography>
						<Typography color="text.secondary">
							per shortlisted candidate
						</Typography>
					</Box>
				</Box>
			</Grid>
		));
	}

	return (
		<Box>
			<Box marginBottom={4}>
				<Box marginBottom={2}>
					<Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
						Pre-Screening Services
					</Typography>
				</Box>
				<Typography variant="h6" component="p" align="center">
					Make smarter recruitment and development decisions, and predict which
					candidates are most likely to be successful in a role and your
					company.
				</Typography>
			</Box>
			<Grid container spacing={4}>
				<Grid item container alignItems="center" xs={12} md={6}>
					<Box data-aos={isMd ? "fade-right" : "fade-up"}>
						<LeftSide />
					</Box>
				</Grid>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
					xs={12}
					md={6}
				>
					<Box maxWidth={500} width={1}>
						<Box
							component="img"
							src="/img/about.svg"
							width={1}
							height={1}
							sx={{
								filter:
									theme.palette.mode === "dark" ? "brightness(0.8)" : "none",
							}}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PreScreening;
