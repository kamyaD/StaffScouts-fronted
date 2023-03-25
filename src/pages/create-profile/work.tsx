import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import WorkExperienceTextFields from "@/components/WorkExperienceTextFields";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import fancyId from "@/utils/fancyId";
import isBrowser from "@/utils/isBrowser";
import { stringifyMap } from "@/utils/misc";
import type { profileValidationSchema } from "@/utils/profileValidationSchema";
import { AddCircle } from "@mui/icons-material";
import { Button, MenuItem, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

const graduateWorkLevel = [
	"Intern/Fellow",
	"Entry Level",
	"Junior Manager",
	"Experienced Professional",
	"Mid-Level Manager",
	"Specialist/Highly Skilled Professional",
	"General/Senior Manager",
	"Directors or Executive",
];

const semiSkilledJobLevel = [
	"Entry Level",
	"Experienced",
	"Master Tradesman/Woman",
	"Supervisor/Lead Technician",
];

type CreateProfileWorkExperienceInputSchema = z.infer<
	typeof profileValidationSchema
>;

const CreateWorkPage: NextPageWithAuthAndLayout = () => {
	const [workComponent, setWorkComponent] = useState<
		Array<Record<string, any>>
	>([{ id: 0, workExperience: "" }]);
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs(""));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs(""));
	const [isCurrentWork, setIsCurrentWork] = useState(false);
	const [workExperienceSelected, setWorkExperienceSelected] = useState(
		new Map<string, string[]>(),
	);

	const professionalWorkLevel = isBrowser
		? window.localStorage.getItem("professionalLevel")
		: "";

	const workLevel =
		professionalWorkLevel === "Graduate / Professional"
			? graduateWorkLevel
			: semiSkilledJobLevel;

	const { control, watch, handleSubmit } =
		useForm<CreateProfileWorkExperienceInputSchema>({
			mode: "onChange",
		});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			setWorkExperienceSelected(
				(prevMap) => new Map(prevMap.set(name, value[name])),
			);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = (values) => {
		const experience = [];

		if (workComponent.length === 1 && workExperienceSelected.has("company")) {
			experience.push(JSON.parse(stringifyMap(workExperienceSelected)));
		}

		workComponent.map((item) => {
			if (item.workExperience !== "") {
				experience.push(JSON.parse(item.workExperience));
			}
		});

		updateProfile({
			experience: JSON.stringify(experience),
			experiences_id: workLevel.findIndex(
				(work) => work === values.work_experience,
			),
		});
	};

	const handleCurrentWorkSelect = () =>
		setIsCurrentWork((prevState) => !prevState);

	const handleAddWorkExperienceTextFields = () => {
		setWorkComponent((prevState) =>
			prevState.concat({
				id: prevState[0].id++ as number,
				workExperience: stringifyMap(workExperienceSelected),
			}),
		);
	};

	const handleRemoveWorkExperienceTextFields = (id: number) => {
		setWorkComponent((prevState) => prevState.filter((item) => item.id !== id));
	};

	return (
		<Container maxWidth={720}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				Add your work experience
			</Typography>

			<form name="profile-work" method="post" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={4} marginTop={2}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							How do you range your job experience?
						</Typography>

						<Grid item xs={11}>
							<FormInputText
								select
								autoFocus={false}
								margin="dense"
								name="work_experience"
								placeholder="Experience level"
								size="medium"
								control={control}
								label="Experience level"
								type="text"
							>
								{workLevel.map((item: string) => (
									<MenuItem key={fancyId()} value={item}>
										{item}
									</MenuItem>
								))}
							</FormInputText>
						</Grid>

						<Typography
							variant="body1"
							marginY={2}
							sx={{
								fontWeight: 500,
							}}
						>
							Add professional work experiences
						</Typography>

						{workComponent
							.slice()
							.sort((a, b) => a.id - b.id)
							.map((item) => (
								<Stack
									direction="row"
									alignItems="stretch"
									spacing={2}
									key={item.id}
									marginBottom={4}
								>
									<WorkExperienceTextFields
										id={item.id}
										control={control}
										handleDelete={handleRemoveWorkExperienceTextFields}
										fromDate={fromDate}
										setFromDate={setFromDate}
										setToDate={setToDate}
										toDate={toDate}
										handleCurrentSchoolSelect={handleCurrentWorkSelect}
										isCurrentWork={isCurrentWork}
									/>
								</Stack>
							))}

						<Grid item xs={12}>
							<Button
								startIcon={<AddCircle fontSize="large" />}
								variant="contained"
								onClick={handleAddWorkExperienceTextFields}
								sx={{ fontWeight: "medium", color: "unset" }}
							>
								ADD WORK EXPERIENCE
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					isSuccess={isSuccess}
					loading={loading}
					nextPageUrl="/create-profile/portfolio"
					nextPageTitle="Portfolio"
				/>
			</form>
		</Container>
	);
};

CreateWorkPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateWorkPage;
