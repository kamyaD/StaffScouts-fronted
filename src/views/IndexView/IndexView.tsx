import Box from "@mui/material/Box";
import React from "react";

import Container from "../../components/Container";
import {
	AboutTop,
	Hero,
	Jobs,
	News,
	Newsletter,
	Process,
	Reviews,
} from "./components";

const IndexView = (): JSX.Element => {
	return (
		<>
			<Box bgcolor={"alternate.main"}>
				<Hero />
			</Box>
			<Container>
				<Process />
			</Container>
			<Box bgcolor={"alternate.main"}>
				<Container>
					<AboutTop />
				</Container>
			</Box>
			<Box bgcolor={"alternate.main"}>
				<Container>
					<Reviews />
				</Container>
			</Box>
			<Container>
				<Jobs />
			</Container>
			<Box bgcolor={"alternate.main"}>
				<Container>
					<News />
				</Container>
			</Box>
			<Container>
				<Newsletter />
			</Container>
		</>
	);
};

export default IndexView;
