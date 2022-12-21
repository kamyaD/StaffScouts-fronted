import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Hero(): JSX.Element {
	const theme = useTheme();

	return (
		<Grid container spacing={4}>
			<Grid item container alignItems="center" xs={12} md={6}>
				<Box>
					<Box marginBottom={2}>
						<Typography
							variant="h3"
							color="text.primary"
							sx={{
								fontWeight: 700,
							}}
						>
							Customized hiring
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="h6"
							component="p"
							color="text.secondary"
							sx={{ fontWeight: 500 }}
						>
							Pay for success hiring!
							<br />
							Only pay once we have successfully place a candidate in your
							organization.
						</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} md={6}>
				<Grid
					container
					spacing={2}
					sx={{ display: { xs: "none", sm: "flex" } }}
				>
					<Grid
						item
						container
						justifyContent="flex-end"
						alignItems="flex-end"
						xs={4}
						sx={{
							"& .lazy-load-image-loaded": {
								width: "80%",
								height: "80%",
								display: "flex !important",
							},
						}}
					>
						<Box
							component={LazyLoadImage}
							height={1}
							width={1}
							borderRadius={2}
							src="/img/unsplash01.jpg"
							alt="..."
							effect="blur"
							sx={{
								objectFit: "cover",
								filter:
									theme.palette.mode === "dark" ? "brightness(0.6)" : "none",
							}}
						/>
					</Grid>
					<Grid
						item
						container
						justifyContent="flex-start"
						alignItems="flex-end"
						xs={8}
						sx={{
							"& .lazy-load-image-loaded": {
								display: "flex !important",
								width: 1,
							},
						}}
					>
						<Box
							component={LazyLoadImage}
							height={1}
							width={1}
							borderRadius={2}
							src="/img/unsplash02.jpg"
							alt="..."
							effect="blur"
							sx={{
								objectFit: "cover",
								filter:
									theme.palette.mode === "dark" ? "brightness(0.6)" : "none",
							}}
						/>
					</Grid>
					<Grid
						item
						container
						justifyContent="flex-end"
						alignItems="flex-start"
						xs={8}
						sx={{
							"& .lazy-load-image-loaded": {
								display: "flex !important",
								width: 1,
							},
						}}
					>
						<Box
							component={LazyLoadImage}
							height={1}
							width={1}
							borderRadius={2}
							src="/img/unsplash03.jpg"
							alt="..."
							effect="blur"
							sx={{
								objectFit: "cover",
								filter:
									theme.palette.mode === "dark" ? "brightness(0.6)" : "none",
							}}
						/>
					</Grid>
					<Grid
						item
						container
						justifyContent="flex-start"
						alignItems="flex-start"
						xs={4}
						sx={{
							"& .lazy-load-image-loaded": {
								width: "80%",
								height: "80%",
								display: "flex !important",
							},
						}}
					>
						<Box
							component={LazyLoadImage}
							height={1}
							width={1}
							borderRadius={2}
							src="/img/unsplash04.jpg"
							alt="..."
							effect="blur"
							sx={{
								objectFit: "cover",
								filter:
									theme.palette.mode === "dark" ? "brightness(0.6)" : "none",
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Hero;
