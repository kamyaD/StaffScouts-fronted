import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { Minimal } from "@/layouts/index";
import { updateProfileFn } from "@/lib/api";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import useStore from "@/store/index";
import type { ProfileInputSchema } from "@/utils/profileValidationSchema";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

// const wordCount = sentence.trim().split(/\s+/).length;

type CreateProfileBioInputSchema = z.infer<typeof profileValidationSchema>;

const CreateBioPage: NextPageWithAuthAndLayout = () => {
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const { displaySnackMessage } = useStore();

	const { control, handleSubmit } = useForm<CreateProfileBioInputSchema>({
		mode: "onChange",
		resolver: zodResolver(profileValidationSchema),
	});

	const { mutate: updateProfile } = useMutation(
		(profileInput: ProfileInputSchema) => updateProfileFn(profileInput),
		{
			onMutate() {
				setRequestLoading(true);
			},
			onSuccess() {
				setRequestLoading(false);
				displaySnackMessage({
					message: "Profile speciality updated successful.",
				});
			},
			onError(error: any) {
				setRequestLoading(false);
				console.log("Class: , Function: onError, Line 43 error():", error);
				if (Array.isArray((error as any).response.data.error)) {
					(error as any).response.data.error.forEach((el: any) =>
						displaySnackMessage({
							message: el.message,
							severity: "error",
						}),
					);
				} else {
					displaySnackMessage({
						message: (error as any).response.data.message,
						severity: "error",
					});
				}
			},
		},
	);

	const onSubmit = (values) => {
		console.log("Class: , Function: onSubmit, Line 74 values():", values);
		const payload = {
			personal_statement: values.personal_statement,
			personal: JSON.stringify(values.videoURL),
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
				Tell us more about yourself.
			</Typography>

			<form name="profile-bio" method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4} marginTop={2}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							A short personal statement to help us know you better (500
							characters).
						</Typography>
						<FormInputText
							autoFocus
							required
							name="personal_statement"
							margin="dense"
							size="medium"
							control={control}
							label="Personal statement"
							placeholder="I am..."
							type="text"
							multiline
							rows={4}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							Upload a video cv link more about yourself
						</Typography>
						<FormInputText
							name="videoURL"
							margin="dense"
							size="medium"
							control={control}
							label="Video CV URL"
							placeholder="https://yout.be"
							type="text"
						/>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					nextPageUrl="/create-profile/education"
					nextPageTitle="Education"
					loading={requestLoading}
				/>
			</form>
		</Container>
	);
};

CreateBioPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateBioPage;
