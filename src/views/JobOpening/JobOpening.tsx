import Box from "@mui/material/Box";

import Container from "../../components/Container";
import { Main as MainSection, Newsletter } from "./components";

const JobOpening = (): JSX.Element => (
	<>
		<Container>
			<MainSection />
		</Container>
		<Box bgcolor="alternate.main">
			<Container>
				<Newsletter />
			</Container>
		</Box>
	</>
);

export default JobOpening;
