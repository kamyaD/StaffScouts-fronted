import { List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import fancyId from "../../../../utils/fancyId";

const Footer = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box
					display={"flex"}
					justifyContent={"space-between"}
					alignItems={"flex-start"}
					width={1}
					flexDirection={{ xs: "column", sm: "row" }}
				>
					<Box
						display={"flex"}
						component="a"
						href="/"
						title="theFront"
						width={80}
					>
						<Box
							component={"img"}
							src={"/img/logo.jpeg"}
							height={1}
							width={1}
						/>
					</Box>
					<Box marginLeft={3} display={"flex"} flexDirection={"column"}>
						<Typography>Quick links</Typography>

						<List dense>
							{[
								"Pricing",
								"Customized hiring",
								"Job candidates",
								"Job listing",
								"Career advisory",
								"Blogs",
								"About us",
								"Private policy",
							].map((item) => (
								<ListItem key={fancyId()} disableGutters>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>
					</Box>
					<Box marginLeft={3}>
						<Typography>Find us</Typography>
						<List dense>
							{[
								"Staff scout Ltd",
								"Comboni road",
								"Bosto villas",
								"Karen, Nairobi",
							].map((item) => (
								<ListItem key={fancyId()} disableGutters>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>
					</Box>
					<Box marginLeft={3}>
						<Typography>Contact us</Typography>
						<List dense>
							{["cc@staffscout.co.ke", "+254727517071"].map((item) => (
								<ListItem key={fancyId()} disableGutters>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Typography align={"center"} variant={"subtitle2"} gutterBottom>
					&copy; staff scout {dayjs().format("YYYY")}. All rights reserved
				</Typography>
				<Typography align={"center"} variant={"caption"} component={"p"}>
					When you visit or interact with our sites, services or tools, we or
					our authorised service providers may use cookies for storing
					information to help provide you with a better, faster and safer
					experience and for marketing purposes.
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;
