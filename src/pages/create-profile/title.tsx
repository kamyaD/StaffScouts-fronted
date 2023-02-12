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

const CreateAccountPage: NextPageWithAuthAndLayout = () => {
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
				Add a title to tell us what you do.
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
							Stand out by describing your expertise in your own words.
						</Typography>
						<FormInputText
							autoFocus
							required
							name="username"
							margin="dense"
							size="medium"
							control={control}
							label="Title"
							placeholder="Example: Customer service executive"
							type="text"
						/>
					</Grid>
				</Grid>
			</form>

			<ProfileBottomNavigation
				nextPageUrl="/create-profile/skills"
				nextPageTitle="Share your skills"
			/>
		</Container>
	);
};

CreateAccountPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateAccountPage;
