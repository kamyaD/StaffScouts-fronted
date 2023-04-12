import Container from "@/components/Container";
import { Box, Card, Grid, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import type { ICandidateProfile } from "../../types";

const Profile = ({ user }: { user: ICandidateProfile }) => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
		defaultMatches: true,
	});

	return (
		<Box sx={{ overflowX: "hidden" }}>
			<Box bgcolor="primary.main" paddingY={4}>
				<Container>
					<Typography variant="h4" fontWeight={700} gutterBottom>
						{`${user?.user.first_name} ${user?.user.last_name}`}
					</Typography>
					<Typography variant="h6">{user.job_title}</Typography>
				</Container>
			</Box>
			<Grid item xs={12} md={10}>
				<Container>
					<Card
						sx={{
							boxShadow: 0,
							padding: 4,
							borderRadius: 3,
							border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
						}}
					>
						<>
							<Typography variant="h6">Summary</Typography>
							<Typography variant="body1">{user.personal_statement}</Typography>
						</>
					</Card>
					<Card
						sx={{
							boxShadow: 0,
							padding: 4,
							marginY: 2,
							borderRadius: 3,
							border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
						}}
					>
						<>
							<Typography variant="h6">Experience</Typography>
							<Typography variant="body1">{user.experience}</Typography>
						</>
					</Card>
					<Card
						sx={{
							boxShadow: 0,
							padding: 4,
							marginY: 2,
							borderRadius: 3,
							border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
						}}
					>
						<>
							<Typography variant="h6">Education</Typography>
							<Typography variant="body1">{user.education}</Typography>
						</>
					</Card>
				</Container>
			</Grid>
		</Box>
	);
};

export default Profile;
