import Box from "@mui/material/Box";
import React, { Fragment } from "react";

import Container from "../../components/Container";
import type { ContractType, Job } from "../../types";
import {
	AboutTop,
	Hero,
	Jobs,
	News,
	Newsletter,
	Process,
	Reviews,
} from "./components";

export interface HomeProps {
	jobs: Array<Job>;
	contractTypes: Array<ContractType>;
}

function IndexView({ jobs, contractTypes }: HomeProps): JSX.Element {
	return (
		<Fragment>
			<Box bgcolor="alternate.main">
				<Hero />
			</Box>
			<Container>
				<Process />
			</Container>
			<Box bgcolor="alternate.main">
				<Container>
					<AboutTop />
				</Container>
			</Box>
			<Box bgcolor="alternate.main">
				<Container>
					<Reviews />
				</Container>
			</Box>
			<Container maxWidth={{ sm: 720, md: 960 }}>
				<Jobs jobs={jobs} contractTypes={contractTypes} />
			</Container>
			<Box bgcolor="alternate.main">
				<Container>
					<News />
				</Container>
			</Box>
			<Container>
				<Newsletter />
			</Container>
		</Fragment>
	);
}

export default IndexView;
