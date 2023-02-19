import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Paper, Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

interface Props {
	nextPageUrl: string;
	nextPageTitle?: string;
	loading?: boolean;
}

const ProfileBottomNavigation = ({
	nextPageUrl,
	nextPageTitle,
	loading,
}: Props): JSX.Element => {
	const theme = useTheme();
	const { push, back } = useRouter();
	const pathname = usePathname();
	const linkPath = pathname.split("/").at(-1);

	const handleBack = () => back();
	const handleNext = () => (loading ? () => {} : push(nextPageUrl));

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
					{linkPath !== "title" ? (
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
					) : (
						<div />
					)}
					<LoadingButton
						variant="contained"
						type="submit"
						color="primary"
						size="large"
						loading={loading}
						loadingPosition="end"
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
					</LoadingButton>

					{/*<Button*/}
					{/*	variant="contained"*/}
					{/*	type="submit"*/}
					{/*	onClick={handleNext}*/}
					{/*	endIcon={*/}
					{/*		theme.direction === "rtl" ? (*/}
					{/*			<KeyboardArrowLeft />*/}
					{/*		) : (*/}
					{/*			<KeyboardArrowRight />*/}
					{/*		)*/}
					{/*	}*/}
					{/*>*/}
					{/*	{nextPageTitle ?? "Next"}*/}
					{/*</Button>*/}
				</Stack>
			</Paper>
		</Box>
	);
};

export default ProfileBottomNavigation;
