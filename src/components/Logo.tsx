import Box from "@mui/material/Box";
import Link from "next/link";

const logo = "/img/logo.jpeg";

function Logo(): JSX.Element {
	return (
		<Box
			component={Link}
			href="/"
			role="presentation"
			style={{ cursor: "pointer" }}
		>
			<Box display="flex" title="logo" width={100}>
				<Box component="img" src={logo} alt="logo" height={1} width={1} />
			</Box>
		</Box>
	);
}

export default Logo;
