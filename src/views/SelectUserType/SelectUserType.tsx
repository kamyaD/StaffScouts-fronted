import Container from "@/components/Container";
import fancyId from "@/utils/fancyId";
import {
	MenuBookTwoTone,
	PagesTwoTone,
	RadioButtonUnchecked,
	WorkTwoTone,
} from "@mui/icons-material";
/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const mock = [
	{
		title: "I am a candidate",
		icon: <MenuBookTwoTone color="action" />,
		value: "candidate",
	},
	{
		title: "I am an employer",
		icon: <PagesTwoTone color="action" />,
		value: "employer",
	},
	{
		title: "I am both candidate and employer",
		icon: <WorkTwoTone color="action" />,
		value: "candidate-and-employer",
	},
];

const StyledCard = styled(Card)(({ theme }) => ({
	position: "relative",
	cursor: "pointer",
	// height: 200,
	// [theme.breakpoints.down('sm')]: {
	// 	width: '100% !important', // Overrides inline-style
	// 	height: 100,
	// },
	"&:hover, &.Mui-focusVisible": {
		zIndex: 1,
		backgroundColor: alpha(theme.palette.primary.main, 0.1),
	},
	"&.Mui-selected": {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		border: "none",
		// backgroundColor: alpha(theme.palette.primary.main, 0.1),
		// borderRadius: theme.shape.borderRadius,
	},
}));

type Alignment = "employer" | "candidate" | "candidate-and-employer" | "...";

const SelectUserType = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});
	const { push } = useRouter();

	const [alignment, setAlignment] = useState<Alignment>("...");
	const [activeState, setActiveState] = useState("");
	const [chccked, setChecked] = useState("");

	useEffect(() => {
		switch (alignment) {
			case "candidate":
				setActiveState("candidate");
				return;
			case "employer":
				setActiveState("employer");
				return;
			case "candidate-and-employer":
				setActiveState("candidate-and-employer");
				return;
			default:
				return;
		}
	}, [alignment]);

	const handleClick = (index: number) => {
		switch (index) {
			case 0:
				setAlignment("candidate");
				setChecked("candidate is checked");
				return;
			case 1:
				setAlignment("employer");
				setChecked("employer is checked");
				return;
			case 2:
				setAlignment("candidate-and-employer");
				setChecked("candidate and employer is checked");
				return;
			default:
				return;
		}
	};

	const handleStates = (check: string, index: number) => {
		switch (check) {
			case "candidate is checked":
				setChecked("candidate is checked");
				return;
			case "employer is checked":
				setChecked("employer is checked");
				return;
			case "candidate and employer is checked":
				setChecked("candidate and employer is checked");
				return;
			default:
				return;
		}
	};

	const handlePushToDashboardViews = async () => {
		switch (alignment) {
			case "employer":
				await push("/employer/analytics");
				return;
			case "candidate":
				await push("/candidate/jobs");
				return;
			case "candidate-and-employer":
				await push("/dashboard/analytics");
				return;
			default:
				return;
		}
	};

	return (
		<Container>
			<Box
				marginTop={4}
				p={4}
				sx={{
					border: `1px solid ${theme.palette.divider}`,
					borderRadius: 2,
				}}
			>
				<Box>
					<Typography
						variant="h4"
						align={"center"}
						data-aos={"fade-up"}
						gutterBottom
						sx={{
							fontWeight: 700,
						}}
					>
						Select view as an employer, candidate or both
					</Typography>
				</Box>
				<Container>
					<Grid container spacing={2}>
						{mock.map((item, index) => (
							<Grid item xs={12} sm={6} md={4} key={fancyId()}>
								<Box
									key={fancyId()}
									// value={item.value}
									component={StyledCard}
									padding={2}
									width={1}
									height="200px"
									marginX={1}
									variant="outlined"
									onClick={() => handleClick(index)}
									// sx={{
									// 	backgroundColor: alignment === activeState ? alpha(theme.palette.primary.main, 0.1)
									// 	: 'transparent',
									// }}
									// handleChange={(e, value) => handleChange}
								>
									<CardHeader
										avatar={
											<Box
												component={Avatar}
												width={50}
												height={50}
												// marginBottom={2}
												bgcolor={theme.palette.primary.main}
												color={theme.palette.background.paper}
											>
												{item.icon}
											</Box>
										}
										action={
											<IconButton aria-label="settings">
												<RadioButtonUnchecked />
											</IconButton>
										}
									/>
									<CardContent>
										<Box display={"flex"} flexDirection={"column"}>
											<Typography
												variant={"h6"}
												gutterBottom
												sx={{ fontWeight: 500 }}
											>
												{item.title}
											</Typography>
										</Box>
									</CardContent>
								</Box>
							</Grid>
						))}
					</Grid>
					<Box
						display="flex"
						flexDirection={{ xs: "column", sm: "row" }}
						alignItems={{ xs: "stretched", sm: "flex-start" }}
						justifyContent={"center"}
						marginTop={isMd ? 12 : 4}
					>
						<Button
							variant="contained"
							color="primary"
							size="large"
							fullWidth={!isMd}
							onClick={handlePushToDashboardViews}
							endIcon={
								alignment !== "..." && (
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
								)
							}
						>
							{`Proceed as ${alignment.split("-").join(" ")}`}
						</Button>
					</Box>
				</Container>
			</Box>
		</Container>
	);
};

export default SelectUserType;
