import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import React from "react";

import Container from "../../components/Container";
import { Faq, Main as MainSection, Plans, Support } from "./components";

const Employers = (): JSX.Element => {
	const theme = useTheme();

	return (
		<>
			<MainSection />
			<Box bgcolor="alternate.main">
				<Container>
					<Support />
				</Container>
			</Box>
			<Container maxWidth={400} paddingY="0 !important">
				<Divider />
			</Container>
			<Container>
				<Faq />
			</Container>
			<Box
				position="relative"
				sx={{
					backgroundColor: theme.palette.alternate.main,
				}}
			>
				<Container>
					<Plans />
				</Container>
			</Box>
		</>
	);
};

export default Employers;
