import { skeletonRows } from "@/utils/skeletonLoaders";
import { LocationOn, PaymentsOutlined } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Skeleton,
	Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

function UserJobCard(): JSX.Element {
	const theme = useTheme();

	return (
		<Grid item xs={12}>
			<Box
				component={Card}
				width={1}
				height={1}
				borderRadius={0}
				// borderBottom={1}
				boxShadow={0}
				display="flex"
				flexDirection={{ xs: "column", md: "row" }}
				sx={{
					backgroundImage: "none",
					bgcolor: "transparent",
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
			>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<Skeleton width="30%">
						<Typography variant="h5" fontWeight={700}>
							.
						</Typography>
					</Skeleton>
					<Box marginY={1}>
						<Box
							component={Button}
							width="10%"
							variant="text"
							color="text.secondary"
							startIcon={<LocationOn />}
							sx={{ paddingY: 0, paddingX: 0 }}
						>
							{skeletonRows(1)}
						</Box>
						<Box
							component={Button}
							width="15%"
							variant="text"
							color="text.secondary"
							startIcon={<PaymentsOutlined />}
							sx={{ paddingY: 0, paddingLeft: 2 }}
						>
							{skeletonRows(1)}
						</Box>
					</Box>
					<Typography color="text.secondary">{skeletonRows(3)}</Typography>
					<Box
						marginTop={2}
						display="flex"
						justifyContent="space-between"
						width="30%"
					>
						<Box marginY={1} width="100%">
							<Skeleton width="100%">
								<Typography>.</Typography>
							</Skeleton>
						</Box>
					</Box>
				</CardContent>
			</Box>
		</Grid>
	);
}

export default UserJobCard;
