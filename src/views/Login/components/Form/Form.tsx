import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
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

type IFormInput = {
	email: string;
	password: string;
};

const Form = (): JSX.Element => {
	const initialValues = {
		email: "",
		password: "",
	};

	const { handleSubmit, control, reset, formState } = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = (values: any) => {
		return values;
	};

	return (
		<Box>
			<Box marginBottom={4}>
				<Typography
					sx={{
						textTransform: "uppercase",
						fontWeight: "medium",
					}}
					gutterBottom
					color={"text.secondary"}
				>
					Login
				</Typography>
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
			<form method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<FormInputText
							required
							name="email"
							margin="dense"
							size="medium"
							control={control}
							label="Email *"
							type="text"
							placeholder="Email"
						/>
					</Grid>
					<Grid item xs={12}>
						<Box
							display="flex"
							flexDirection={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "stretched", sm: "center" }}
							justifyContent={"space-between"}
							width={1}
							marginBottom={2}
						>
							<Box marginBottom={{ xs: 1, sm: 0 }}>
								<Typography variant={"subtitle2"}>
									Enter your password
								</Typography>
							</Box>
							<Typography variant={"subtitle2"}>
								<Link
									component={"a"}
									color={"primary"}
									href={"/password-reset-cover"}
									underline={"none"}
								>
									Forgot your password?
								</Link>
							</Typography>
						</Box>
						<FormInputText
							required
							name="password"
							type="password"
							margin="dense"
							size="medium"
							control={control}
							label="Password *"
							placeholder="Email"
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
									<Link
										component={"a"}
										color={"primary"}
										href={"/signup-cover"}
										underline={"none"}
									>
										Sign up here.
									</Link>
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
