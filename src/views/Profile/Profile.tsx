import EducationCard from "@/components/Cards/EducationCard";
import type { IWorkExperience } from "@/components/Cards/WorkExperienceCard";
import WorkExperienceCard from "@/components/Cards/WorkExperienceCard";
import Container from "@/components/Container";
import ImageUpload from "@/components/ImageUpload";
import fancyId from "@/utils/fancyId";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Card,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { ICandidateProfile } from "../../types";

const validationSchema = z.object({
	profile_pic: z
		.string()
		.min(1, "Photo is required")
		.url("Photo URL is invalid"),
});

export type ProfileInputSchema = z.infer<typeof validationSchema>;

const Profile = ({ user }: { user: ICandidateProfile }) => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
		defaultMatches: true,
	});
	const { data: session } = useSession();

	const { username, image } = session?.user || {
		name: "Anonymous User",
		image: "/img/avatar.svg",
	};

	const { handleSubmit, control } = useForm<ProfileInputSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: user,
		mode: "onChange",
	});

	console.log(
		"Class: , Function: Profile, Line 51 JSON.parse(user.education)():",
		JSON.parse(user.education),
	);

	return (
		<Box sx={{ overflowX: "hidden" }} bgcolor="alternate.main">
			<Box bgcolor="primary.main" paddingY={0}>
				<Container paddingY={6}>
					<Stack spacing={2} direction="row" alignItems="center">
						<ImageUpload name="profile_pic" control={control} />
						{/*<Avatar*/}
						{/*	alt={username}*/}
						{/*	src={image}*/}
						{/*	aria-describedby="menu-popover"*/}
						{/*	aria-controls="menu-popover"*/}
						{/*	aria-haspopup="true"*/}
						{/*	typeof="button"*/}
						{/*	sizes={isSm ? "large" : "medium"}*/}
						{/*/>*/}
						<div>
							<Typography variant="h4" fontWeight={700}>
								{`${user?.user.first_name} ${user?.user.last_name}`}
							</Typography>
							<Typography variant="h6">{user.job_title}</Typography>
						</div>
					</Stack>
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
							<Typography variant="h5" fontWeight={700}>
								Summary
							</Typography>
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
							<Typography variant="h5" fontWeight={700}>
								Employment History
							</Typography>
							{JSON.parse(user.experience).map(
								(experience: IWorkExperience) => (
									<WorkExperienceCard
										key={fancyId()}
										workExperience={experience}
									/>
								),
							)}
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
							<Typography variant="h5" fontWeight={700}>
								Education
							</Typography>
							{JSON.parse(user.education).map((education: any) => (
								<EducationCard key={fancyId()} education={education} />
							))}
						</>
					</Card>
				</Container>
			</Grid>
		</Box>
	);
};

export default Profile;
