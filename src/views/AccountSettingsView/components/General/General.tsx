import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputText } from "../../../../components/FormInput";

const validationSchema = yup.object({
	firstName: yup
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name")
		.required("Please specify your first name"),
	lastName: yup
		.string()
		.trim()
		.min(2, "Please enter a valid name")
		.max(50, "Please enter a valid name")
		.required("Please specify your last name"),
	email: yup
		.string()
		.trim()
		.email("Please enter a valid email address")
		.required("Email is required."),
	password: yup.string().required("Please specify your password"),
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
		email: "",
		password: "",
	};

	const { handleSubmit, control } = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
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
				<Link color="secondary" href="/company-terms" underline="none">
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
							Enter your email
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
							Enter your email
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
							Enter your password
						</Typography>
						<FormInputText
							required
							name="password"
							type={isPasswordHidden ? "text" : "password"}
							margin="dense"
							size="medium"
							control={control}
							label="Password"
							placeholder="Password"
							InputProps={{
								endAdornment: (
									<InputAdornment
										sx={{ cursor: "pointer" }}
										onClick={togglePassword}
										position="end"
									>
										{isPasswordHidden ? <Visibility /> : <VisibilityOff />}
									</InputAdornment>
								),
							}}
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
