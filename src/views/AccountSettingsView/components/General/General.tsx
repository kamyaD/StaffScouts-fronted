import { FormInputText } from "@/components/FormInput";
import ImageUpload from "@/components/ImageUpload";
import useRequest from "@/hooks/useRequest";
import useStore from "@/store/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const validationSchema = z.object({
	first_name: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
	last_name: z
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name"),
	username: z
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

function General({ user }: any): JSX.Element {
	const { authUser } = useStore();

	console.log(
		"Class: General, Function: General, Line 53 authUser():",
		authUser,
	);

	// const [userDefaults, setUserDefaults] = useState(initialValues);

	const { data: me, error }: { data: any | undefined; error?: AxiosError } =
		useRequest(
			{
				url: "/api/me",
			},
			{ refreshInterval: 120_000 },
		);

	const { handleSubmit, control } = useForm<GeneralProfileInputSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: user,
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
				<ImageUpload
					name="profile_pic"
					control={control}
					profile_pic={user?.profile_pic}
				/>
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
