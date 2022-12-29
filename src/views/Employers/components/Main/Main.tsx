import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";

import Container from "../../../../components/Container";
import fancyId from "../../../../utils/fancyId";

const mock = [
	{
		title: "800",
		subtitle: "Credits at 800 KES",
		price: "800Credits at 800 KES",
		features: [
			"Post Job for free",
			"Unlimited preview of candidate profiles",
			"Shortlist candidates and  access full profiles for up to 2 candidates",
		],
		isHighlighted: false,
	},
	{
		title: "3200",
		subtitle: "Credits at 3200 KES",
		price: "800Credits at 800 KES",
		features: [
			"Post Job for free",
			"Unlimited preview of candidate profiles",
			"Shortlist candidates and  access full profiles for up to 10 candidates",
		],
		isHighlighted: true,
	},
	{
		title: "6000",
		subtitle: "Credits at 6000 KES",
		price: "800Credits at 800 KES",
		features: [
			"Post Job for free",
			"Unlimited preview of candidate profiles",
			"Shortlist candidates and  access full profiles for up to 20 candidates",
		],
		isHighlighted: false,
	},
];

const Main = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	const [pricingOption, setPricingOption] = useState("annual");

	const handleClick = (
		event: any,
		newPricingOption: React.SetStateAction<string>,
	) => {
		setPricingOption(newPricingOption);
	};

	const renderToggler = () => (
		<Box display="flex" justifyContent="center" marginBottom={4}>
			<ToggleButtonGroup value={pricingOption} exclusive onChange={handleClick}>
				<ToggleButton
					value="annual"
					size={isMd ? "large" : "small"}
					sx={{
						backgroundColor:
							pricingOption === "annual"
								? `${theme.palette.primary.light} !important`
								: "transparent",
						border: `1px solid ${theme.palette.primary.main}`,
					}}
				>
					<Typography
						variant="subtitle2"
						sx={{
							fontWeight: 700,
							color:
								pricingOption === "annual" ? "common.white" : "text.primary",
						}}
					>
						Annual
					</Typography>
				</ToggleButton>
				<ToggleButton
					value="monthly"
					size={isMd ? "large" : "small"}
					sx={{
						backgroundColor:
							pricingOption === "monthly"
								? `${theme.palette.primary.light} !important`
								: "transparent",
						border: `1px solid ${theme.palette.primary.main}`,
					}}
				>
					<Typography
						variant="subtitle2"
						sx={{
							fontWeight: 700,
							color:
								pricingOption !== "annual" ? "common.white" : "text.primary",
						}}
					>
						Monthly
					</Typography>
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);

	return (
		<Box>
			<Box
				sx={{
					position: "relative",
					backgroundColor: theme.palette.alternate.main,
					backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`,
					marginTop: -13,
					paddingTop: 13,
				}}
			>
				<Container position="relative" zIndex={3}>
					<Box>
						<Box marginBottom={4}>
							<Typography
								variant="h3"
								gutterBottom
								align="center"
								sx={{
									fontWeight: 900,
								}}
							>
								We connect you to great talent!
							</Typography>
							<Typography
								variant="h6"
								component="p"
								color="text.primary"
								align="center"
							>
								Our profiles go beyond the traditional CV - we give candidates a
								visible platform to display their expertise and experience to
								you, so that you can find the perfect match, fast!
							</Typography>
							<Typography
								marginTop={2}
								variant="h6"
								component="p"
								color="text.secondary"
								align="center"
							>
								Our platform serves all! We structure access to not only
								professionals, but also general staff and technical skilled and
								semiskilled staff.
							</Typography>
						</Box>
					</Box>
				</Container>
			</Box>
			<Container>
				<Grid container spacing={4}>
					{mock.map((item, i) => (
						<Grid item xs={12} md={4} key={fancyId()}>
							<Box
								component={Card}
								height={1}
								display="flex"
								flexDirection="column"
								variant="outlined"
							>
								<CardContent
									sx={{
										padding: 4,
									}}
								>
									<Box marginBottom={2}>
										<Typography variant="h3" fontWeight={600} gutterBottom>
											{item.title}
										</Typography>
										<Typography variant="h5" fontWeight={500}>
											{item.subtitle}
										</Typography>
									</Box>
									<Grid container spacing={1}>
										{item.features.map((feature, j) => (
											<Grid item xs={12} key={j}>
												<Box
													component={ListItem}
													disableGutters
													width="auto"
													padding={0}
												>
													<Box
														component={ListItemAvatar}
														minWidth="auto !important"
														marginRight={2}
													>
														<Box
															component={Avatar}
															bgcolor={theme.palette.primary.main}
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
													<ListItemText primary={feature} />
												</Box>
											</Grid>
										))}
									</Grid>
								</CardContent>
								<Box flexGrow={1} />
								<CardActions sx={{ justifyContent: "flex-end", padding: 4 }}>
									<Button size="large" variant="contained">
										Buy
									</Button>
								</CardActions>
							</Box>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Main;
