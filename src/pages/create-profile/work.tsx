import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import fancyId from "@/utils/fancyId";
import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import { MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";

const jobLevel = [
	"Intern/Fellow",
	"Entry Level",
	"Junior Manager",
	"Experienced Professional",
	"Mid-Level Manager",
	"Specialist/Highly Skilled Professional",
	"General/Senior Manager",
	"Directors or Executive",
];

const CreateWorkPage: NextPageWithAuthAndLayout = () => {
	const { control } = useForm<RegisterInputSchema>({
		mode: "onChange",
	});

	return (
		<Container maxWidth={720}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				Add your work experience
			</Typography>

			<form>
				<Grid container spacing={4} marginTop={2}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							How do you range your job experience?
						</Typography>
						<FormInputText
							select
							autoFocus={false}
							margin="dense"
							name="userType"
							placeholder="Professional or General Technical workers"
							size="medium"
							control={control}
							label="Experience level"
							type="text"
						>
							{jobLevel.map((item: string) => (
								<MenuItem key={fancyId()} value={item}>
									{item}
								</MenuItem>
							))}
						</FormInputText>
					</Grid>

					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							Add professional work experiences
						</Typography>
						<FormInputText
							required
							name="company"
							margin="dense"
							size="medium"
							control={control}
							label="Company"
							type="text"
						/>
						<FormInputText
							required
							name="jobTitle"
							margin="dense"
							size="medium"
							control={control}
							label="Job Title"
							type="text"
						/>
						<FormInputText
							autoFocus
							required
							name="bio"
							margin="dense"
							size="medium"
							control={control}
							label="Job description"
							placeholder=""
							type="text"
							multiline
							rows={4}
						/>
						<FormInputText
							name="achievements"
							margin="dense"
							size="medium"
							control={control}
							label="Achievements"
							placeholder=""
							type="text"
							multiline
							rows={4}
						/>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					nextPageUrl="/create-profile/portfolio"
					nextPageTitle="Portfolio"
				/>
			</form>
		</Container>
	);
};

CreateWorkPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateWorkPage;
