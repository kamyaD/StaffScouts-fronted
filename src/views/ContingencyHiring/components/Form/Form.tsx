import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useForm } from "react-hook-form";
/* eslint-disable react/no-unescaped-entities */
import * as yup from "yup";

import { FormInputText } from "../../../../components/FormInput";

const validationSchema = yup.object({
	username: yup.string().trim(),
	password: yup.string().required("Please specify your password"),
});

type IFormInput = {
	email: string;
	password: string;
};

function Form(): JSX.Element {
	const { handleSubmit, control, reset, formState } = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
		// defaultValues: initialValues,
		mode: "onChange",
	});

	const onSubmit = async (values: any) => {};

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
							name="username"
							margin="dense"
							size="medium"
							control={control}
							label="Username"
							type="text"
							placeholder="blahblah"
						/>
					</Grid>
					<Grid item container xs={12}>
						<Box
							display="flex"
							flexDirection={{ xs: "column", sm: "row" }}
							alignItems={{ xs: "stretched", sm: "center" }}
							justifyContent="space-between"
							width={1}
							maxWidth={600}
							margin="0 auto"
						>
							<Box marginBottom={{ xs: 1, sm: 0 }}>
								<Typography variant="subtitle2">
									Don't have an account yet?{" "}
									<Button
										component={Link}
										href="/register"
										variant="text"
										color="secondary"
									>
										Sign up here.
									</Button>
								</Typography>
							</Box>
							<Button size="large" variant="contained" type="submit">
								Login
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}

export default Form;
