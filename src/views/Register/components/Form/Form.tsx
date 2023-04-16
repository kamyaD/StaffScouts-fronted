import { FormInputText } from "@/components/FormInput";
import { signUpUserFn } from "@/lib/api";
import useStore from "@/store/index";
import { candidatesChoice, employerChoice } from "@/utils/fixtures";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { InputAdornment, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const validationSchema = z
	.object({
		userType: z.string(),
		firstName: z
			.string()
			.min(2, "First name must contain at least 2 character(s)")
			.max(18),
		lastName: z
			.string()
			.min(2, "Last name must contain at least 2 character(s)")
			.max(18),
		userName: z
			.string()
			.min(2, "User name must contain at least 2 character(s)")
			.max(18)
			.trim(),
		email: z.string().email("Please enter a valid email address").trim(),
		password: z
			.string()
			.min(8, "The password should have at minimum length of 8"),
		confirmPassword: z.string().min(1, "Confirm Password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Password don't match",
	});

export type RegisterInputSchema = z.infer<typeof validationSchema>;

// const UserType = ["Candidate", "Employer", "Both Candidate & Employer"];
const ExperienceType = ["Professional", "General / Technical Worker"];

function Form(): JSX.Element {
	const { displaySnackMessage, setRequestLoading, requestLoading } = useStore();
	const [alignment, setAlignment] = useState("candidate");
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const [isConfirmPasswordHidden, showConfirmPassword] =
		useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);
	const toggleConfirmPassword = () =>
		showConfirmPassword((prevState) => !prevState);
	const accountType =
		alignment === "candidate" ? candidatesChoice : employerChoice;

	const { push } = useRouter();

	const initialValues = {
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
		userType: "",
	};

	const methods = useForm<RegisterInputSchema>({
		resolver: zodResolver(validationSchema),
		defaultValues: initialValues,
		mode: "onChange",
	});

	const {
		mutate: registerUser,
		data,
		isSuccess,
	} = useMutation((userData: RegisterInputSchema) => signUpUserFn(userData), {
		onMutate(variables) {
			setRequestLoading(true);
		},
		onSuccess(data) {
			setRequestLoading(false);
			displaySnackMessage({
				message:
					"Account registration successful. Kindly login to view your profile.",
			});
			push("/login");
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
	});

	const {
		reset,
		handleSubmit,
		control,
		formState: { isSubmitSuccessful },
	} = methods;

	useEffect(() => {
		if (isSubmitSuccessful) {
			console.log(
				"Class: Form, Function: , Line 127 isSubmitSuccessful():",
				isSubmitSuccessful,
			);
			// reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);

	const onSubmit: SubmitHandler<RegisterInputSchema> = (values) => {
		const payload = {
			...values,
			userType: alignment,
		};
		registerUser(payload);
	};

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
			</Box>

			<ToggleButtonGroup
				fullWidth
				size="small"
				color="standard"
				value={alignment}
				exclusive
				onChange={handleFormTypeChange}
				aria-label="Work"
				sx={{ marginBottom: "28px" }}
			>
				<ToggleButton value="candidate">Candidate</ToggleButton>
				<ToggleButton value="employer">Employer</ToggleButton>
			</ToggleButtonGroup>

			<FormProvider {...methods}>
				<form method="post" onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={4}>
						{/*<Grid item xs={12}>*/}
						{/*	<FormInputText*/}
						{/*		select*/}
						{/*		autoFocus={false}*/}
						{/*		margin="dense"*/}
						{/*		name="userType"*/}
						{/*		placeholder="Professional or General Technical workers"*/}
						{/*		size="medium"*/}
						{/*		control={control}*/}
						{/*		label="Experience level"*/}
						{/*		type="text"*/}
						{/*	>*/}
						{/*		{accountType.map((item: string) => (*/}
						{/*			<MenuItem key={fancyId()} value={item}>*/}
						{/*				{item}*/}
						{/*			</MenuItem>*/}
						{/*		))}*/}
						{/*	</FormInputText>*/}
						{/*</Grid>*/}

						<Grid item xs={12} md={6}>
							<FormInputText
								required
								name="firstName"
								size="medium"
								control={control}
								label="First name"
								type="text"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInputText
								required
								name="lastName"
								size="medium"
								control={control}
								label="Last name"
								type="text"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInputText
								required
								name="userName"
								size="medium"
								control={control}
								label="Username"
								type="text"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInputText
								required
								name="email"
								size="medium"
								control={control}
								label="Email"
								type="email"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormInputText
								required
								name="password"
								type={isPasswordHidden ? "text" : "password"}
								size="medium"
								control={control}
								label="Password"
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
						<Grid item xs={12} md={6}>
							<FormInputText
								required
								name="confirmPassword"
								type={isConfirmPasswordHidden ? "text" : "password"}
								size="medium"
								control={control}
								label="Confirm password"
								InputProps={{
									endAdornment: (
										<InputAdornment
											sx={{ cursor: "pointer" }}
											onClick={toggleConfirmPassword}
											position="end"
										>
											{isConfirmPasswordHidden ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
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
									loading={requestLoading}
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
									By clicking &quot;Sign up&quot; button you agree with our
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
			</FormProvider>
		</Box>
	);
}

export default Form;
