import { Divider } from "@mui/material";
import Box from "@mui/material/Box";

import Container from "../../components/Container";
import { About, Hero, PreScreening } from "./components";

function ContingencyHiring(): JSX.Element {
	return (
		<>
			<Box bgcolor="alternate.main">
				<Container>
					<Hero />
				</Container>
			</Box>
			<Container>
				<About />
			</Container>
			<Divider />
			<Container>
				<PreScreening />
			</Container>
		</>
	);
}

export default ContingencyHiring;
