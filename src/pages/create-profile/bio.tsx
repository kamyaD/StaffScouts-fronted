import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import useRequest from "@/hooks/useRequest";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import { mutateStringObject } from "@/utils/misc";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import type { ICandidateProfile } from "../../types";

// const wordCount = sentence.trim().split(/\s+/).length;

type CreateProfileBioInputSchema = z.infer<typeof profileValidationSchema>;

const CreateBioPage: NextPageWithAuthAndLayout = () => {
	const { data }: { data: ICandidateProfile } = useRequest({
		url: "/api/profile",
	});

	const { control, handleSubmit } = useForm<CreateProfileBioInputSchema>({
		mode: "onChange",
		resolver: zodResolver(profileValidationSchema),
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = (values) => {
		const payload = {
			personal_statement: values.personal_statement,
			personal: mutateStringObject(data.personal, {
				videoURL: values.videoURL,
			}),
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
					isSuccess={isSuccess}
					nextPageUrl="/create-profile/education"
					nextPageTitle="Education"
					loading={loading}
				/>
			</form>
		</Container>
	);
};

CreateBioPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateBioPage;
