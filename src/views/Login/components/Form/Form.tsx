import { FormInputText } from "@/components/FormInput";
import { useAppDispatch } from "@/store/index";
import { displaySnackMessage } from "@/store/slices/snack";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, InputAdornment, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const validationSchema = z.object({
	username: z.string().trim(),
	password: z.string().min(4, { message: "Please specify your password" }),
});

type IFormInput = {
	username: string;
	password: string;
};

function Form({ csrfToken }: { csrfToken: string }): JSX.Element {
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);
	const { push, prefetch } = useRouter();

	const dispatch = useAppDispatch();

	const { handleSubmit, control } = useForm<IFormInput>({
		resolver: zodResolver(validationSchema),
		// defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = async ({ username, password }: IFormInput) => {
		setIsLoading(true);
		const res = await signIn("credentials", {
			username,
			password,
			callbackUrl: `${window.location.origin}/account`,
			redirect: false,
		});

		if (res?.error) {
			dispatch(
				displaySnackMessage({
					message: res?.error as string,
					severity: "error",
				}),
			);
		} else {
			dispatch(
				displaySnackMessage({
					message: "You have successfully logged in",
				}),
			);
		}
		if (res?.url) await push(res?.url);
		setIsLoading(false);
	};

	useEffect(() => {
		prefetch("account");
	}, []);

	return (
		// <Box bgcolor={theme.palette.alternate.main}
		<Box
			// position="relative"
			// minHeight="calc(100vh - 247px)"
			// display="flex"
			// alignItems="center"
			// justifyContent="center"
			// height={1}
			marginTop={-12}
			paddingTop={12}
		>
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
					<input name="csrfToken" type="hidden" defaultValue={csrfToken} />

					<Grid item xs={12}>
						<FormInputText
							required
							name="username"
							margin="dense"
							size="medium"
							control={control}
							label="Username"
							type="text"
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
						<Box
							display="flex"
							flexDirection={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "stretched", sm: "center" }}
							justifyContent="flex-end"
							width={1}
							marginBottom={0}
						>
							<Button
								component={Link}
								href="/password-reset-cover"
								variant="text"
								color="inherit"
								sx={{ fontWeight: 700 }}
							>
								Forgot your password?
							</Button>
						</Box>
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
								Login
							</LoadingButton>
							<Box marginTop={2}>
								<Typography variant="subtitle2">
									Don&apos;t have an account yet?{" "}
									<Button
										component={Link}
										href="/register"
										variant="text"
										color="inherit"
										sx={{ fontWeight: 700 }}
									>
										Sign up here.
									</Button>
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default Form;
