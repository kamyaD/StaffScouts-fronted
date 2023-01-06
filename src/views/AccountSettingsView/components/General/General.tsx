import { FormInputText } from "@/components/FormInput";
import ImageUpload from "@/components/ImageUpload";
import { getMeFn } from "@/lib/api";
import useStore from "@/store/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const validationSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
	lastName: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
	userName: z
		.string()
		.trim()
		.min(2, "Please enter a valid username")
		.max(50, "Please enter a valid username"),
	email: z.string().trim().email("Please enter a valid email address"),
	bio: z.string().trim().max(500, "Should be less than 500 chars").optional(),
	country: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(80, "Please enter a valid name"),
	city: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(80, "Please enter a valid name"),
	profile_pic: z
		.string()
		.min(1, "Photo is required")
		.url("Photo URL is invalid"),
});

export type GeneralProfileInputSchema = z.infer<typeof validationSchema>;

function useGetMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: () => getMeFn(),
	});
}

const initialValues = {
	firstName: "",
	lastName: "",
	userName: "",
	bio: "",
	email: "",
	country: "",
	city: "",
	profile_pic: "",
};

function General(): JSX.Element {
	const { displaySnackMessage, setAuthUser, setRequestLoading, authUser } =
		useStore();

	const [userDefaults, setUserDefaults] = useState(initialValues);

	// const { data } = useGetMe();
	const { data } = useQuery(["me"], getMeFn, {
		select(data) {
			return data;
		},
		onSuccess(data) {
			setAuthUser(data);
			setRequestLoading(false);
		},
		onError(error) {
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
	});

	const userDataDefaults = {
		firstName: data?.first_name as string,
		lastName: data?.last_name as string,
		userName: data?.username as string,
		bio: data?.bio as string,
		email: data?.email as string,
		country: data?.country as string,
		city: data?.city as string,
		profile_pic: data?.profile_pic as string,
	};

	useEffect(() => {
		const userData = {
			firstName: data?.first_name as string,
			lastName: data?.last_name as string,
			userName: data?.username as string,
			bio: data?.bio as string,
			email: data?.email as string,
			country: data?.country as string,
			city: data?.city as string,
			profile_pic: data?.profile_pic as string,
		};

		setUserDefaults(userData);
	}, []);

	console.log(
		"Class: General, Function: General, Line 85 authUser():",
		userDataDefaults,
	);

	const { handleSubmit, control } = useForm<GeneralProfileInputSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: userDataDefaults,
		mode: "onChange",
	});

	const onSubmit = () => {};

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
							name="firstName"
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
							name="lastName"
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
							name="userName"
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
							<Button size="large" variant="contained" type="submit" fullWidth>
								Save profile
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default General;
