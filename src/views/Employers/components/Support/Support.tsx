import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";

const Support = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Box>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Box>
						<Typography
							variant={"h6"}
							fontWeight={700}
							align={"center"}
							gutterBottom
						>
							Need a support?
						</Typography>
						<Typography align={"center"}>
							View message performance and test against variants and control.
						</Typography>
						<Box marginTop={2} display={"flex"} justifyContent={"center"}>
							<Button
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
								Contact us
							</Button>
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						borderLeft: {
							xs: "none",
							md: `1px solid ${theme.palette.divider}`,
						},
					}}
				>
					<Box>
						<Typography
							variant={"h6"}
							fontWeight={700}
							align={"center"}
							gutterBottom
						>
							Customize plan
						</Typography>
						<Typography align={"center"}>
							Looking for something else? Request a Consultation to customize a
							plan.
						</Typography>
						<Box marginTop={2} display={"flex"} justifyContent={"center"}>
							<Button
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
								Learn more
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Support;
