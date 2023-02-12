import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import fancyId from "@/utils/fancyId";
import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import { MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

const UserType = ["Candidate", "Employer", "Both Candidate & Employer"];

export default function CreateProfileView() {
	const { control } = useForm<RegisterInputSchema>({
		mode: "onChange",
	});

	return (
		<Container maxWidth={{ sm: 720, md: 960 }}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				Create an account
			</Typography>

			<form>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<FormInputText
							select
							autoFocus={false}
							margin="dense"
							name="userType"
							placeholder=""
							size="medium"
							control={control}
							label="User Type"
							type="text"
						>
							{UserType?.map((item: string) => (
								<MenuItem key={fancyId()} value={item}>
									{item}
								</MenuItem>
							))}
						</FormInputText>
					</Grid>
				</Grid>
			</form>

			<ProfileBottomNavigation nextPageUrl="/" />
		</Container>
	);
}
