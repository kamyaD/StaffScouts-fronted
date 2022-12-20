import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
/* eslint-disable react/no-unescaped-entities */
import * as yup from "yup";

import { FormInputText } from "../../../../components/FormInput";
import { useLoginUserMutation } from "../../../../store/services/users";

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

type IFormInput = {
	email: string;
	password: string;
};

const Form = (): JSX.Element => {
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);

	const isAuthenticated = useIsAuthenticated();
	const signIn = useSignIn();
	const navigate = useNavigate();

	const [loginUser] = useLoginUserMutation();

	const initialValues = {
		email: "",
		password: "",
	};

	const { handleSubmit, control, reset, formState } = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
		// defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = async (values: any) => {
		console.log("Class: , Function: onSubmit, Line 69 values():", values);
		const appHeaders = new Headers();
		appHeaders.append("Content-Type", "application/json");
		const requestOptions = {
			headers: appHeaders,
			method: "POST",
			body: values,
		};

		const response = await fetch("http://localhost:8000/login", requestOptions);
		const result = await response.json();

		// const result = await loginUser(values);

		console.log("Class: , Function: onSubmit, Line 66 result():", result);

		// if (result) {
		// 	signIn({
		// 		token: "35v3443bn368367n306306wbn407qn420b436b4",
		// 		tokenType: "Bearer",
		// 		authState: { name: "React User", uid: 123456 },
		// 		expiresIn: 120,
		// 	});
		// 	navigate("/login");
		// } else {
		// 	alert("Error Occurred. Try Again");
		// }
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
					Welcome back
				</Typography>
				<Typography color="text.secondary">
					Login to manage your account.
				</Typography>
			</Box>
			<form name="login-form" method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<FormInputText
							required
							name="email"
							margin="dense"
							size="medium"
							control={control}
							label="Email"
							type="email"
							placeholder="blah@email.com"
						/>
					</Grid>
					<Grid item xs={12}>
						<Box
							display="flex"
							flexDirection={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "stretched", sm: "center" }}
							justifyContent={"flex-end"}
							width={1}
							marginBottom={0}
						>
							<Button
								component={Link}
								to="/password-reset-cover"
								variant="text"
								color="secondary"
							>
								Forgot your password?
							</Button>
						</Box>
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
							justifyContent={"space-between"}
							width={1}
							maxWidth={600}
							margin={"0 auto"}
						>
							<Box marginBottom={{ xs: 1, sm: 0 }}>
								<Typography variant={"subtitle2"}>
									Don't have an account yet?{" "}
									<Button
										component={Link}
										to="/register"
										variant="text"
										color="secondary"
									>
										Sign up here.
									</Button>
								</Typography>
							</Box>
							<Button size={"large"} variant={"contained"} type={"submit"}>
								Login
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default Form;
