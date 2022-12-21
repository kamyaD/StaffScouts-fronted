import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const mock = [
	{
		title: 300,
		subtitle: "300 + candidates applying for their dream jobs.",
		suffix: "+",
	},
	{
		title: 45,
		subtitle: "45 + partners putting up job listings on our platform.",
		suffix: "+",
	},
	{
		title: 99,
		subtitle: "99% of our customers rated 5-star on our services offered.",
		suffix: "%",
	},
];

function PromoNumbers(): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	});

	return (
		<Box ref={ref}>
			<Card sx={{ padding: 3 }}>
				<CardContent>
					<Box>
						<Typography
							variant="h5"
							sx={{ fontWeight: 700 }}
							align="center"
							gutterBottom
						>
							Hiring? Candidates are working for you
						</Typography>
						<Typography
							variant="subtitle1"
							align="center"
							color="text.secondary"
						>
							We get thousands of job postings weekly, but only accept the
							openings at the top companies.
						</Typography>
					</Box>
					<Box marginY={4}>
						<Grid container spacing={2}>
							{mock.map((item, i) => (
								<Grid key={i} item xs={12} md={4}>
									<Typography variant="h3" align="center" gutterBottom>
										<Box fontWeight={600}>
											<CountUp
												redraw={false}
												end={inView ? +item.title : 0}
												start={0}
												suffix={item.suffix}
											/>
										</Box>
									</Typography>
									<Typography
										color="text.secondary"
										align="center"
										component="p"
									>
										{item.subtitle}
									</Typography>
								</Grid>
							))}
						</Grid>
					</Box>
					<Box
						display="flex"
						flexDirection={{ xs: "column", sm: "row" }}
						alignItems={{ xs: "stretched", sm: "flex-start" }}
						justifyContent="center"
					>
						<Box
							component={Button}
							variant="contained"
							color="primary"
							size="large"
							fullWidth={!isMd}
						>
							Explore
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}

export default PromoNumbers;
