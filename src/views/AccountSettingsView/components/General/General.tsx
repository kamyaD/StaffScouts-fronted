import { FormInputText } from "@/components/FormInput";
import ImageUpload from "@/components/ImageUpload";
import { updateProfileFn } from "@/lib/api";
import useStore from "@/store/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";

import type { ICandidateProfile } from "../../../../types";

const validationSchema = z.object({
	first_name: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name")
		.optional(),
	last_name: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name")
		.optional(),
	username: z
		.string()
		.trim()
		.min(2, "Please enter a valid username")
		.max(50, "Please enter a valid username")
		.optional(),
	email: z
		.string()
		.trim()
		.email("Please enter a valid email address")
		.optional(),
	bio: z.string().trim().max(500, "Should be less than 500 chars").optional(),
	country: z.string().trim().optional(),
	city: z.string().trim().optional(),
	profile_pic: z
		.string()
		.min(1, "Photo is required")
		.url("Photo URL is invalid"),
});

export type GeneralProfileInputSchema = z.infer<typeof validationSchema>;

function General({ user }: { user: Partial<ICandidateProfile> }): JSX.Element {
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const { displaySnackMessage } = useStore();
	const { handleSubmit, control } = useForm<GeneralProfileInputSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: user,
		mode: "onChange",
	});

	const { mutate: updateProfile } = useMutation(
		(userData: GeneralProfileInputSchema) => updateProfileFn(userData),
		{
			onMutate() {
				setRequestLoading(true);
			},
			onSuccess() {
				setRequestLoading(false);
				displaySnackMessage({
					message: "Profile updated successful.",
				});
			},
			onError(error: any) {
				setRequestLoading(false);
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

	const onSubmit: SubmitHandler<GeneralProfileInputSchema> = (values) => {
		updateProfile(values);
	};

	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
			>
				<div>
					<Typography variant="h6" gutterBottom fontWeight={700}>
						Change your private information
					</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						Please read our{" "}
						<Link color="secondary" href="/company-terms">
							terms of use
						</Link>{" "}
						to be informed how we manage your private data.
					</Typography>
				</div>
				<ImageUpload name="profile_pic" control={control} />
			</Stack>
			<Box paddingY={4}>
				<Divider />
			</Box>
			<form name="profile-form" method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<FormInputText
							name="first_name"
							margin="dense"
							size="medium"
							control={control}
							label="First Name"
							type="text"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormInputText
							name="last_name"
							margin="dense"
							size="medium"
							control={control}
							label="Last Name"
							type="text"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormInputText
							name="username"
							type="text"
							margin="dense"
							size="medium"
							control={control}
							label="Username"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormInputText
							name="email"
							margin="dense"
							size="medium"
							control={control}
							label="Email"
							type="email"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormInputText
							name="country"
							margin="dense"
							size="medium"
							control={control}
							label="Country"
							type="text"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormInputText
							name="city"
							type="text"
							margin="dense"
							size="medium"
							control={control}
							label="City"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormInputText
							multiline
							rows={5}
							name="bio"
							type="text"
							margin="dense"
							size="medium"
							control={control}
							label="Bio"
							placeholder="Tell us more about yourself"
						/>
					</Grid>
					<Grid item container xs={6}>
						<Box
							display="flex"
							flexDirection={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "stretched", sm: "center" }}
							justifyContent="space-between"
							width={1}
							margin="0 auto"
						>
							<LoadingButton
								fullWidth
								variant="contained"
								type="submit"
								color="primary"
								size="large"
								loading={requestLoading}
								loadingIndicator="Please wait..."
							>
								Save profile
							</LoadingButton>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default General;
