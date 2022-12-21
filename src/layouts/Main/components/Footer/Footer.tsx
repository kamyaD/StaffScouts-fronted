import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function Footer(): JSX.Element {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					width={1}
					flexDirection={{ xs: "column", sm: "row" }}
				>
					<Box
						display="flex"
						component="a"
						href="/"
						title="theFront"
						width={80}
					>
						<Box component="img" src="/img/logo.jpeg" height={1} width={1} />
					</Box>
					<Box display="flex" flexWrap="wrap" alignItems="center">
						<Button component={Link} to="/" color="inherit">
							Pricing
						</Button>
						<Button component={Link} to="/" color="inherit">
							Hiring
						</Button>
						<Button component={Link} to="/" color="inherit">
							Candidates
						</Button>
						<Button component={Link} to="/" color="inherit">
							Listing
						</Button>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography align="center" variant="subtitle2" gutterBottom>
					&copy; staff scout {dayjs().format("YYYY")}. All rights reserved
				</Typography>
				<Typography align="center" variant="caption" component="p">
					When you visit or interact with our sites, services or tools, we or
					our authorised service providers may use cookies for storing
					information to help provide you with a better, faster and safer
					experience and for marketing purposes.
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Footer;
