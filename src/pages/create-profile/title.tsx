import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import fancyId from "@/utils/fancyId";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import type * as z from "zod";

export type CreateProfileTitleInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	"job_title" | "country" | "website"
>;

const CreateTitlePage: NextPageWithAuthAndLayout = () => {
	const options = useMemo(() => countryList().getData(), []);

	const { handleSubmit, control } = useForm<CreateProfileTitleInputSchema>({
		mode: "onChange",
		resolver: zodResolver(profileValidationSchema),
	});

	const { loading, updateProfile } = useUpdateProfile();

	const onSubmit: SubmitHandler<CreateProfileTitleInputSchema> = (values) => {
		const customPersonal = {
			country: values.country,
			website: values.website,
		};
		const payload = {
			job_title: values.job_title,
			personal: JSON.stringify(customPersonal),
		};
		updateProfile(payload);
	};

	return (
		<Container maxWidth={720}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				Tell us about yourself.
			</Typography>

			<form
				name="profile-title"
				method="post"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid container spacing={4} marginTop={2}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							Stand out by describing yourself and personal details.
						</Typography>
						<FormInputText
							autoFocus
							required
							name="job_title"
							margin="dense"
							size="medium"
							control={control}
							label="Title"
							placeholder="Example: Customer service executive"
							type="text"
						/>
						<FormInputText
							required
							name="website"
							margin="dense"
							size="medium"
							control={control}
							label="Website"
							placeholder="Example: https://my-website.com"
							type="text"
						/>
						<FormInputText
							required
							select
							name="country"
							margin="dense"
							placeholder=""
							size="medium"
							control={control}
							label="Country"
							type="text"
							SelectProps={{
								native: true,
							}}
						>
							{options.map((option) => (
								<option key={fancyId()} value={option.label}>
									{option.label}
								</option>
							))}
						</FormInputText>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					loading={loading}
					nextPageUrl="/create-profile/skills"
					nextPageTitle="Share your skills"
				/>
			</form>
		</Container>
	);
};

CreateTitlePage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateTitlePage;
