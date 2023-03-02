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

const educationLevel = [
	"High school certificate",
	"Certificate",
	"Diploma",
	"Advanced diploma",
	"Bachelors degree",
	"Masters degree",
	"PHD",
];

const CreateBioPage: NextPageWithAuthAndLayout = () => {
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
				Education experience
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
							The level of education you have achieved
						</Typography>
						<FormInputText
							name="company"
							margin="dense"
							size="medium"
							control={control}
							label="Institution name"
							type="text"
						/>
						<FormInputText
							select
							autoFocus={false}
							margin="dense"
							name="userType"
							placeholder="Professional or General Technical workers"
							size="medium"
							control={control}
							label="Education level"
							type="text"
						>
							{educationLevel.map((item: string) => (
								<MenuItem key={fancyId()} value={item}>
									{item}
								</MenuItem>
							))}
						</FormInputText>
						<FormInputText
							name="company"
							margin="dense"
							size="medium"
							control={control}
							label="Course"
							type="text"
						/>
						<FormInputText
							name="bio"
							margin="dense"
							size="medium"
							control={control}
							label="Activities"
							placeholder=""
							type="text"
							multiline
							rows={4}
						/>
					</Grid>
				</Grid>
			</form>

			<ProfileBottomNavigation
				nextPageUrl="/create-profile/work"
				nextPageTitle="Work Experience"
			/>
		</Container>
	);
};

CreateBioPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateBioPage;
