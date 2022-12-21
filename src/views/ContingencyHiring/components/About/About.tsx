import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
/* eslint-disable react/no-unescaped-entities */
import React from "react";

import fancyId from "../../../../utils/fancyId";

const mock = [
	{
		number: "Kes 13,000 to Kes 100,000",
		title: "Salary between",
		subtitle: "80% of 1 month salary",
	},
	{
		number: "Kes 100,001 to Kes 500,000",
		title: "Salary between",
		subtitle: "50% of 1 month salary",
	},
	{
		number: "Kes 500,001 to Above",
		title: "Salary between",
		subtitle: "35% of 1 month salary",
	},
];

function About(): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography
					variant="h4"
					align="center"
					sx={{ fontWeight: 700, marginBottom: 2 }}
				>
					Charges
				</Typography>
				<Typography variant="h6" component="p" align="center">
					Get in touch with our expert team to explore how Staff Scout can help
					your business
				</Typography>

				<Grid container spacing={1} sx={{ marginY: 1 }}>
					{[
						"Arrange a free call back, live chat, email or face to face",
						"Join hundreds of happy customers.",
						"A team of experts on hand.",
					].map((item, i) => (
						<Grid item xs={12} key={fancyId()}>
							<Box component={ListItem} disableGutters width="auto" padding={0}>
								<Box
									component={ListItemAvatar}
									minWidth="auto !important"
									marginRight={2}
								>
									<Box
										component={Avatar}
										bgcolor={theme.palette.secondary.main}
										width={20}
										height={20}
									>
										<svg
											width={12}
											height={12}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</Box>
								</Box>
								<ListItemText primary={item} />
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
			<Box>
				<Grid container spacing={4}>
					{mock.map((item, i) => (
						<Grid item xs={12} sm={6} md={4} key={fancyId()}>
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
									<Typography
										variant="h6"
										gutterBottom
										sx={{ fontWeight: 500 }}
									>
										{item.title}
									</Typography>
									<Typography
										variant="h6"
										color="secondary"
										gutterBottom
										sx={{ fontWeight: 700 }}
									>
										{item.number}
									</Typography>
									<Typography color="text.secondary">
										{item.subtitle}
									</Typography>
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
}

export default About;
