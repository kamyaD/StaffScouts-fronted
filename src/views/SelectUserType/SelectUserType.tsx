import Container from "@/components/Container";
import fancyId from "@/utils/fancyId";
import {
	MenuBookTwoTone,
	PagesTwoTone,
	WorkTwoTone,
} from "@mui/icons-material";
/* eslint-disable react/no-unescaped-entities */
import { Card, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { MouseEvent } from "react";
import { useState } from "react";

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

const SelectUserType = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	const [alignment, setAlignment] = useState("...");

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setAlignment(newAlignment);
	};

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
						<Grid item xs={12} sm={6} md={4} key={fancyId()}>
							<Box
								key={fancyId()}
								// value={item.value}
								component={Card}
								padding={4}
								width={1}
								height="200px"
								marginX={10}
								variant="outlined"
								// handleChange={(e, value) => handleChange}
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
						{`Proceed as ${alignment.split("-").join(" ")}`}
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default SelectUserType;
