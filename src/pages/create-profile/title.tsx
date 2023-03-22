import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import useStore from "@/store/index";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import type * as z from "zod";

export type CreateProfileTitleInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	"job_title"
>;

const CreateTitlePage: NextPageWithAuthAndLayout = () => {
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const { displaySnackMessage, setProfile } = useStore();

	const [contryValue, setCountryValue] = useState('')
	const options = useMemo(() => countryList().getData(), [])

	const handleCountriesChange = value => setCountryValue(value)

	const { handleSubmit, control } = useForm<CreateProfileTitleInputSchema>({
		mode: "onChange",
		resolver: zodResolver(profileValidationSchema),
	});

	// const { mutate: createProfile } = useMutation(
	// 	(profileTitle: CreateProfileTitleInputSchema) =>
	// 		createProfileFn(profileTitle),
	// 	{
	// 		onMutate() {
	// 			setRequestLoading(true);
	// 		},
	// 		onSuccess() {
	// 			setRequestLoading(false);
	// 			displaySnackMessage({
	// 				message: "Profile title updated successful.",
	// 			});
	// 		},
	// 		onError(error: any) {
	// 			setRequestLoading(false);
	// 			console.log("Class: , Function: onError, Line 43 error():", error);
	// 			if (Array.isArray((error as any).response.data.error)) {
	// 				(error as any).response.data.error.forEach((el: any) =>
	// 					displaySnackMessage({
	// 						message: el.message,
	// 						severity: "error",
	// 					}),
	// 				);
	// 			} else {
	// 				displaySnackMessage({
	// 					message: (error as any).response.data.message,
	// 					severity: "error",
	// 				});
	// 			}
	// 		},
	// 	},
	// );

	const onSubmit: SubmitHandler<CreateProfileTitleInputSchema> = (values) => {
		console.log("Class: , Function: onSubmit, Line 64 values():", values);
		// setProfile(values);
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
							autoFocus
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
							autoFocus
							required
							name="country"
							margin="dense"
							size="medium"
							control={control}
							label="Country"
							placeholder=""
							type="text"
						/>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					loading={requestLoading}
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
