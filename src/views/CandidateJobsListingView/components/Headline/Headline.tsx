import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

const Headline = (): JSX.Element => {
	return (
		<Box
			display={"flex"}
			flexDirection={{ xs: "column", sm: "row" }}
			justifyContent={"space-between"}
			alignItems={{ xs: "flex-start", sm: "center" }}
		>
			<Typography marginBottom={{ xs: 1, sm: 0 }}>Product listing</Typography>
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="primary" href="/demos/ecommerce">
					Home
				</Link>
				<Typography color="text.primary">Products</Typography>
			</Breadcrumbs>
		</Box>
	);
};

export default Headline;
