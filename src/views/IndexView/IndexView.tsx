import Box from "@mui/material/Box";
import React, { Suspense } from "react";

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
	contractTypes: ContractType[];
}

function IndexView({ jobs, contractTypes }: HomeProps): JSX.Element {
	return (
		<Suspense fallback={null}>
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
			<Container>
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
		</Suspense>
	);
}

export default IndexView;
