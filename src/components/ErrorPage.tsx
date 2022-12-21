import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import errorStack from "error-stack-parser";
import React, { ElementType, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import Container from "./Container";

export type PageProps = {
	title: string | ReactNode;
	subtitle?: string | ReactNode;
	action?: ReactNode;
	as?: ElementType;
	image: string;
};

function RedBox({ error }: { error: Error }) {
	const [isVisible, setIsVisible] = useState(true);
	const frames = errorStack.parse(error);

	return (
		<div
			className={clsx(
				"fixed inset-0 z-10 flex items-center justify-center transition",
				{
					"pointer-events-none opacity-0": !isVisible,
				},
			)}
		>
			<button
				className="absolute inset-0 block h-full w-full bg-black opacity-75"
				onClick={() => setIsVisible(false)}
			/>
			<div className="border-lg text-primary relative mx-5vw my-16 max-h-75vh overflow-y-auto rounded-lg bg-red-500 p-12">
				<Typography variant="h3">{error.message}</Typography>
				<div>
					{frames.map((frame) => (
						<div
							key={[frame.fileName, frame.lineNumber, frame.columnNumber].join(
								"-",
							)}
							className="pt-4"
						>
							<Typography variant="h5" className="pt-2">
								{frame.functionName}
							</Typography>
							<div className="font-mono opacity-75">
								{frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function ErrorPage({
	error,
	pageProps,
}: {
	error?: Error;
	pageProps: PageProps;
}) {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	return (
		<>
			<noscript>
				<div
					style={{
						backgroundColor: "black",
						color: "white",
						padding: 30,
					}}
				>
					<h1 style={{ fontSize: "2em" }}>{pageProps.title}</h1>
					<p style={{ fontSize: "1.5em" }}>{pageProps.subtitle}</p>
					<small>
						Also, this site works much better with JavaScript enabled...
					</small>
				</div>
			</noscript>
			<main className="relative">
				{error && process.env.NODE_ENV === "development" ? (
					<RedBox error={error} />
				) : null}
				<Box
					bgcolor={theme.palette.alternate.main}
					position="relative"
					minHeight="calc(100vh - 247px)"
					display="flex"
					alignItems="center"
					justifyContent="center"
					height={1}
					marginTop={-12}
					paddingTop={12}
				>
					<Container>
						<Grid container>
							<Grid
								item
								container
								alignItems="center"
								justifyContent="center"
								xs={12}
								md={6}
							>
								<Box>
									<Typography
										variant="h1"
										component="h1"
										align={isMd ? "left" : "center"}
										sx={{ fontWeight: 700 }}
									>
										{error ? 500 : 404}
									</Typography>
									<Typography
										variant="h6"
										component="p"
										color="text.secondary"
										align={isMd ? "left" : "center"}
									>
										{pageProps.title}
										<br />
										{pageProps.subtitle}
									</Typography>
									<Box
										marginTop={4}
										display="flex"
										justifyContent={{ xs: "center", md: "flex-start" }}
									>
										<Button
											component={Link}
											variant="contained"
											color="primary"
											size="large"
											to="/"
										>
											Go home
										</Button>
									</Box>
								</Box>
							</Grid>
							<Grid item container justifyContent="center" xs={12} md={6}>
								<Box height={1} width={1} maxWidth={500}>
									<Box
										component="img"
										src="/img/not-found.svg"
										width={1}
										height={1}
										sx={{
											filter:
												theme.palette.mode === "dark"
													? "brightness(0.8)"
													: "none",
										}}
									/>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</main>
		</>
	);
}

export default ErrorPage;
