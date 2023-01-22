import Container from "@/components/Container";
import {
	MenuBookTwoTone,
	PagesTwoTone,
	WorkTwoTone,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
/* eslint-disable react/no-unescaped-entities */
import React from "react";

const mock = [
	{
		title: "I am looking for work",
		icon: <MenuBookTwoTone color="action" />,
	},
	{
		title: "I am an employer",
		icon: <PagesTwoTone color="action" />,
	},
	{
		title:
			"I looking for work, but may also look to hire staff professionally, or at home",
		icon: <WorkTwoTone color="action" />,
	},
];

const SelectUserType = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	return (
		<Box marginTop={isMd ? 20 : 4}>
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
					{mock.map((item, i) => (
						<Grid item xs={12} sm={6} md={4} key={i}>
							<Box
								component={Card}
								padding={4}
								width={1}
								height={1}
								data-aos={"fade-up"}
								data-aos-delay={i * 100}
								data-aos-offset={100}
								data-aos-duration={600}
								variant={"outlined"}
							>
								<Box display={"flex"} flexDirection={"column"}>
									<Box
										component={Avatar}
										width={50}
										height={50}
										marginBottom={2}
										bgcolor={theme.palette.primary.main}
										color={theme.palette.background.paper}
									>
										{item.icon}
									</Box>
									<Typography
										variant={"h6"}
										gutterBottom
										sx={{ fontWeight: 500 }}
									>
										{item.title}
									</Typography>
								</Box>
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
					>
						Proceed as an ...
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default SelectUserType;
