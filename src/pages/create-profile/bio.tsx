import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";

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
				Tell us more about yourself.
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
							A short bio to get help us know you better.
						</Typography>
						<FormInputText
							autoFocus
							required
							name="bio"
							margin="dense"
							size="medium"
							control={control}
							label="Bio"
							placeholder="I am..."
							type="text"
							multiline
							rows={4}
						/>
					</Grid>
				</Grid>
			</form>

			<ProfileBottomNavigation nextPageUrl="/account" nextPageTitle="Finish" />
		</Container>
	);
};

CreateBioPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateBioPage;
