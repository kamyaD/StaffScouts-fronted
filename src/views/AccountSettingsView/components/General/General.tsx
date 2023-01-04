import { FormInputText } from "@/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
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
	email: z.string().trim().email("Please enter a valid email address"),
	bio: z.string().trim().max(500, "Should be less than 500 chars"),
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
	address: z
		.string()
		.min(2, "Please enter a valid address")
		.max(200, "Please enter a valid address"),
});

type IFormInput = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

function General(): JSX.Element {
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const initialValues = {
		firstName: "",
		lastName: "",
		bio: "",
		email: "",
		country: "",
		city: "",
		address: "",
	};

	const { handleSubmit, control } = useForm<IFormInput>({
		resolver: zodResolver(validationSchema),
		defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = () => {};

	return (
		<Box>
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
			<Box paddingY={4}>
				<Divider />
			</Box>
			<form name="profile-form" method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Enter your first name
						</Typography>

						<FormInputText
							name="firstName"
							margin="dense"
							size="medium"
							control={control}
							label="First Name"
							type="text"
							placeholder="Blah"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Enter your last name
						</Typography>
						<FormInputText
							name="lastName"
							margin="dense"
							size="medium"
							control={control}
							label="Last Name"
							type="text"
							placeholder="Blah"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Email
						</Typography>
						<FormInputText
							name="email"
							margin="dense"
							size="medium"
							control={control}
							label="Email"
							type="email"
							placeholder="blah@email.com"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Address
						</Typography>
						<FormInputText
							name="address"
							type="text"
							margin="dense"
							size="medium"
							control={control}
							label="Address"
							placeholder="Address"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Country
						</Typography>
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
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							City
						</Typography>
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
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Enter your bio
						</Typography>
						<FormInputText
							multiline
							rows={5}
							name="bio"
							type="text"
							margin="dense"
							size="medium"
							control={control}
							label="Bio"
							placeholder="Bio"
						/>
					</Grid>
					<Grid item container xs={12}>
						<Box
							display="flex"
							flexDirection={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "stretched", sm: "center" }}
							justifyContent="space-between"
							width={1}
							margin="0 auto"
						>
							<Button size="large" variant="contained" type="submit">
								Save
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default General;
