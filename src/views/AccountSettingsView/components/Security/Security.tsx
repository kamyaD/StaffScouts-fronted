import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputText } from "../../../../components/FormInput";

const validationSchema = yup.object({
	currentPassword: yup.string().required("Please specify your password"),
	newPassword: yup
		.string()
		.required("Please specify your password")
		.min(8, "The password should have at minimum length of 8"),
	repeatPassword: yup
		.string()
		.required("Please specify your password")
		.min(8, "The password should have at minimum length of 8"),
});

type IFormInput = {
	currentPassword: string;
	newPassword: string;
	repeatPassword: string;
};

function Security(): JSX.Element {
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const initialValues = {
		currentPassword: "",
		newPassword: "",
		repeatPassword: "",
	};

	const { handleSubmit, control } = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = () => {};

	return (
		<Box>
			<Box
				display="flex"
				flexDirection={{ xs: "column", md: "row" }}
				justifyContent="space-between"
				alignItems={{ xs: "flex-start", md: "center" }}
			>
				<Typography variant="h6" fontWeight={700}>
					Change your password
				</Typography>
				<Button
					size="large"
					variant="outlined"
					sx={{ marginTop: { xs: 2, md: 0 } }}
				>
					Log out
				</Button>
			</Box>
			<Box paddingY={4}>
				<Divider />
			</Box>
			<form
				name="security-form"
				method="post"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Current password
						</Typography>
						<FormInputText
							required
							name="currentPassword"
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
					<Grid item xs={12}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							New password
						</Typography>
						<FormInputText
							required
							name="newPassword"
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
					<Grid item xs={12}>
						<Typography
							variant="subtitle2"
							sx={{ marginBottom: 2 }}
							fontWeight={700}
						>
							Repeat password
						</Typography>
						<FormInputText
							required
							name="repeatPassword"
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
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Switch color="primary" defaultChecked />}
							label={
								<Typography variant="subtitle1" fontWeight={700}>
									Public Profile
								</Typography>
							}
							labelPlacement="end"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Switch color="primary" />}
							label={
								<Typography variant="subtitle1" fontWeight={700}>
									Expose your email
								</Typography>
							}
							labelPlacement="end"
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
							<Box marginBottom={{ xs: 1, sm: 0 }}>
								<Typography variant="subtitle2">
									You may also consider to update your{" "}
									<Link
										color="primary"
										href="/account-notifications"
										underline="none"
									>
										notification settings.
									</Link>
								</Typography>
							</Box>
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

export default Security;
