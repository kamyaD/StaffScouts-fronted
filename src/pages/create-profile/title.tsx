import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { env } from "@/env/server.mjs";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import type { ReactElement } from "react";
import { useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import type * as z from "zod";

import type { ICandidateProfile } from "../../types";
import { authOptions } from "../api/auth/[...nextauth]";

export type CreateProfileTitleInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	"job_title" | "country" | "website"
>;

const CreateTitlePage: NextPageWithAuthAndLayout = ({
	user,
}: {
	user: ICandidateProfile;
}) => {
	const countries = useMemo(() => countryList().getData(), []);
	const personal = user?.personal ? JSON.parse(user.personal) : {};

	const defaultValues = {
		job_title: user?.job_title || "",
		country: personal?.country || "",
		website: personal?.website || "",
	};

	const { handleSubmit, control } = useForm<CreateProfileTitleInputSchema>({
		mode: "onChange",
		resolver: zodResolver(profileValidationSchema),
		defaultValues,
	});

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

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
							name="website"
							margin="dense"
							size="medium"
							control={control}
							label="Website"
							placeholder="Example: https://my-website.com"
							type="text"
						/>

						<Controller
							name="country"
							control={control}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<Autocomplete
									id="country-select"
									onChange={(_, data) => onChange(data.label)}
									options={countries}
									defaultValue={countries.find(
										(country) => country.label === personal?.country,
									)}
									autoHighlight
									getOptionLabel={(option) => option?.label}
									renderOption={(props, option) => (
										<Box component="li" {...props}>
											{option.label}
										</Box>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Country"
											margin="dense"
											size="medium"
											error={!!error}
											helperText={error ? error.message : null}
										/>
									)}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					isSuccess={isSuccess}
					loading={loading}
					nextPageUrl="/create-profile/speciality"
					nextPageTitle="Share your skills"
				/>
			</form>
		</Container>
	);
};

CreateTitlePage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

CreateTitlePage.auth = true;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await getServerSession(req, res, authOptions);
	const config = {
		headers: {
			Authorization: `Bearer ${session?.user?.token}`,
		},
	};
	const url = `${env.API_URL}/candidate/profile/${session?.user.id}`;
	const response = await fetch(url, config);
	const user = await response.json();

	return {
		props: {
			user,
		},
	};
};

export default CreateTitlePage;
