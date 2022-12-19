import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import React from "react";

import Container from "../../components/Container";
import { Main } from "../../layouts";
import {
	AboutTop,
	Advantages,
	Customers,
	Features,
	Hero,
	Jobs,
	Newsletter,
	Process,
	PromoNumbers,
	Questions,
	TrustedCompanies,
} from "./components";

const IndexView = (): JSX.Element => {
	return (
		<Main>
			<Hero />
			<Box bgcolor={"alternate.main"}>
				<Container>
					<Questions />
				</Container>
			</Box>
			<Container>
				<Process />
			</Container>
			<Box bgcolor={"alternate.main"}>
				<Container>
					<AboutTop />
				</Container>
			</Box>
			<Container>
				<Jobs />
			</Container>
			<Box bgcolor={"alternate.main"}>
				<Container>
					<PromoNumbers />
				</Container>
			</Box>
			<Container>
				<Features />
			</Container>
			<Box bgcolor={"alternate.main"}>
				<Container>
					<Advantages />
				</Container>
			</Box>
			<Container>
				<TrustedCompanies />
			</Container>
			<Container paddingY={0}>
				<Divider />
			</Container>
			<Container>
				<Customers />
			</Container>
			<Container paddingTop={"0 !important"}>
				<Newsletter />
			</Container>
		</Main>
	);
};

export default IndexView;
