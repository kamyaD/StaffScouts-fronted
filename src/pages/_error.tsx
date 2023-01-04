import Container from "@/components/Container";
import { Main } from "@/layouts/index";
import { Replay } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

export default function FourZeroFour() {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	return (
		<Main>
			<Box
				bgcolor={theme.palette.alternate.main}
				position={"relative"}
				minHeight={`calc(100vh - ${isMd ? "247px - 56px" : "300px - 63px"})`}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				height={"100%"}
			>
				<Container>
					<Typography variant="h2" align="center" fontWeight={600}>
						Oops!
					</Typography>
					<Typography variant="h3" align="center">
						Something went wrong.
					</Typography>
					<Typography variant="body1" align="center" paddingTop={3}>
						But don&apos;t worry - it&apos;s not your fault.
					</Typography>
					<Box marginTop={4} display={"flex"} justifyContent="center">
						<Link href="/" passHref>
							<Button
								variant="contained"
								color="primary"
								size="large"
								startIcon={<Replay />}
							>
								Retry
							</Button>
						</Link>
					</Box>
				</Container>
			</Box>
		</Main>
	);
}
