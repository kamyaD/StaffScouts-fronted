import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, Paper, Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React from "preact/compat";

interface Props {
	nextPageUrl: string;
	nextPageTitle?: string;
}

const ProfileBottomNavigation = ({
	nextPageUrl,
	nextPageTitle,
}: Props): JSX.Element => {
	const theme = useTheme();
	const { push, back } = useRouter();

	const handleBack = () => back();
	const handleNext = () => push(nextPageUrl);

	return (
		<Box sx={{ minWidth: 500 }}>
			<Paper
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					// background: theme.palette.alternate.main,
					paddingY: 1,
					borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					paddingX: 0,
					// borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Stack
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					spacing={2}
				>
					<Button
						variant="contained"
						onClick={handleBack}
						startIcon={
							theme.direction === "rtl" ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)
						}
					>
						Back
					</Button>
					<Button
						variant="contained"
						onClick={handleNext}
						endIcon={
							theme.direction === "rtl" ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)
						}
					>
						{nextPageTitle ?? "Next"}
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
};

export default ProfileBottomNavigation;
