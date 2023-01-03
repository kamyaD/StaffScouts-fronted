import { candidatesChoice, employerChoice } from "@/utils/fixtures";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
/* eslint-disable react/no-unescaped-entities */
import * as yup from "yup";

import { FormInputText } from "../../../../components/FormInput";

const validationSchema = yup.object({
	email: yup
		.string()
		.trim()
		.email("Please enter a valid email address")
		.required("Email is required."),
	password: yup
		.string()
		.required("Please specify your password")
		.min(8, "The password should have at minimum length of 8"),
});

// {
// 	"username": "mashafrancis",
// 	"email": "masha@gmail.com",
// 	"first_name": "Francis",
// 	"last_name": "Masha",
// 	"bio": "This is blah blah",
// 	"profile_pic": "http://localhost:8000/media/konde_francis.jpg",
// 	"city": "Nairobi",
// 	"country": "Kenya",
// 	"job_title": "Engineer",
// 	"availability_status": "Immediately"
// }

type IFormInput = {
	email: string;
	password: string;
};

function Form(): JSX.Element {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [alignment, setAlignment] = useState("candidate");
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const accountType = () =>
		alignment === "candidate" ? candidatesChoice : employerChoice;

	const initialValues = {
		email: "",
		password: "",
	};

	const { handleSubmit, control } = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = (values: any) => values;

	const handleFormTypeChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setAlignment(newAlignment);
	};

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 700,
					}}
				>
					Create an account
				</Typography>
				<Typography color="text.secondary">
					Fill out the form to get started.
				</Typography>
				{/* <ToggleButtonGroup */}
				{/*	fullWidth */}
				{/*	size="small" */}
				{/*	color="secondary" */}
				{/*	value={alignment} */}
				{/*	exclusive */}
				{/*	onChange={handleFormTypeChange} */}
				{/*	aria-label="Work" */}
				{/* > */}
				{/*	<ToggleButton value="candidate">Candidate</ToggleButton> */}
				{/*	<ToggleButton value="employer">Employer</ToggleButton> */}
				{/* </ToggleButtonGroup> */}
			</Box>
			<form method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4}>
					{/* <Grid item xs={12}> */}
					{/*	<FormInputText */}
					{/*		select */}
					{/*		autoFocus */}
					{/*		margin="dense" */}
					{/*		name="experience" */}
					{/*		placeholder="" */}
					{/*		size="medium" */}
					{/*		control={control} */}
					{/*		label="Experience" */}
					{/*		type="text" */}
					{/*		SelectProps={{ */}
					{/*			native: true, */}
					{/*		}} */}
					{/*	> */}
					{/*		{accountType()?.map((item: any) => ( */}
					{/*			<option key={fancyId()} value={item}> */}
					{/*				{item} */}
					{/*			</option> */}
					{/*		))} */}
					{/*	</FormInputText> */}
					{/* </Grid> */}
					<Grid item xs={12}>
						<FormInputText
							required
							name="userName"
							margin="dense"
							size="medium"
							control={control}
							label="Username"
							type="text"
							placeholder="Username"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormInputText
							required
							name="email"
							margin="dense"
							size="medium"
							control={control}
							label="Email"
							type="email"
							placeholder="Email"
						/>
					</Grid>
					<Grid item xs={12}>
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
					<Grid item xs={12}>
						<FormInputText
							required
							name="confirmPassword"
							type={isPasswordHidden ? "text" : "password"}
							margin="dense"
							size="medium"
							control={control}
							label="Confirm password"
							placeholder="Confirm password"
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
							flexDirection={"column"}
							justifyContent="space-between"
							width={1}
							maxWidth={600}
							margin="0 auto"
						>
							<LoadingButton
								fullWidth
								variant="contained"
								type="submit"
								color="primary"
								size="large"
								loading={isLoading}
								loadingIndicator="Please wait..."
							>
								Register
							</LoadingButton>
						</Box>
						<Box marginTop={2}>
							<Typography variant="subtitle2">
								Already have an account?{" "}
								<Button
									component={Link}
									href="/login"
									variant="text"
									color="inherit"
									sx={{ fontWeight: 700 }}
								>
									Login.
								</Button>
							</Typography>
						</Box>
						<Box marginTop={2}>
							<Typography
								variant="subtitle2"
								color="text.secondary"
								align="left"
							>
								By clicking "Sign up" button you agree with our
								<Button
									component={Link}
									href="/company-terms"
									variant="text"
									color="inherit"
									sx={{ fontWeight: 700 }}
								>
									terms and conditions.
								</Button>
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default Form;
