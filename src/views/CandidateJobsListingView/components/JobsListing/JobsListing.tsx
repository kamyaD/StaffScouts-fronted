import fancyId from "@/utils/fancyId";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

import type { IJobs } from "../../../../types";
import { UserJobCard } from "./components";

const JobsListing = ({ jobs }: { jobs?: IJobs }): JSX.Element => {
	const theme = useTheme();
	const [openId, setOpenId] = useState(null);

	return (
		<Grid container spacing={{ xs: 4, md: 2 }}>
			{jobs?.results.map((job) => (
				<UserJobCard key={fancyId()} job={job} />
			))}
		</Grid>
	);
};

export default JobsListing;
