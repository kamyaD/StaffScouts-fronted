import Container from "@/components/Container";
import EducationTextFields from "@/components/EducationTextFields";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import isBrowser from "@/utils/isBrowser";
import { stringifyMap } from "@/utils/misc";
import type { profileValidationSchema } from "@/utils/profileValidationSchema";
import { AddCircle } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

const graduateEducationLevel = [
	"Diploma",
	"Bachelors degree",
	"Masters degree",
	"Doctorate Degree",
];

const semiSkilledEducationLevel = [
	"Primary Education - Partial",
	"Primary Education - Complete",
	"Secondary School - Partial",
	"Secondary School - Complete",
	"Certificate",
	"Diploma",
	"Degree",
];

const trainingType = [
	"Untrained",
	"Trained On the Job",
	"Apprenticeship",
	"Vocational Training/Certification/Licensing",
];

type CreateProfileEducationInputSchema = z.infer<
	typeof profileValidationSchema
>;

const CreateEducationPage: NextPageWithAuthAndLayout = () => {
	const [educationComponent, setEducationComponent] = useState<
		Array<Record<string, any>>
	>([{ id: 0, educationLevel: "" }]);
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs(""));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs(""));
	const [isCurrentSchool, setIsCurrentSchool] = useState(false);
	const [educationLevelSelected, setEducationLevelSelected] = useState(
		new Map<string, string[]>(),
	);

	const handleCurrentSchoolSelect = () =>
		setIsCurrentSchool((prevState) => !prevState);

	const professionalLevel = isBrowser
		? window.localStorage.getItem("professionalLevel")
		: "";

	const educationLevel =
		professionalLevel === "Graduate / Professional"
			? graduateEducationLevel
			: semiSkilledEducationLevel;

	const { control, handleSubmit, watch } =
		useForm<CreateProfileEducationInputSchema>({
			mode: "onChange",
		});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			setEducationLevelSelected(
				(prevMap) => new Map(prevMap.set(name, value[name])),
			);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = () => {
		const education = [];

		if (
			educationComponent.length === 1 &&
			educationLevelSelected.has("institution")
		) {
			education.push(JSON.parse(stringifyMap(educationLevelSelected)));
		}

		educationComponent.map((item) => {
			if (item.educationLevel !== "") {
				education.push(JSON.parse(item.educationLevel));
			}
		});

		updateProfile({ education: JSON.stringify(education) });
	};

	const handleAddEducationTextFields = () => {
		setEducationComponent((prevState) =>
			prevState.concat({
				id: prevState[0].id++ as number,
				educationLevel: stringifyMap(educationLevelSelected),
			}),
		);
	};

	const handleRemoveEducationTextFields = (id: number) => {
		setEducationComponent((prevState) =>
			prevState.filter((item) => item.id !== id),
		);
	};

	return (
		<Container maxWidth={720}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				Education experience
			</Typography>

			<form
				name="profile-education"
				method="post"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid container spacing={4} marginTop={2}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							The level of education you have achieved
						</Typography>
					</Grid>

					{/*<Grid item xs={11}>*/}
					{/*	<FormInputText*/}
					{/*		select*/}
					{/*		autoFocus={false}*/}
					{/*		margin="dense"*/}
					{/*		name="training_type"*/}
					{/*		placeholder=""*/}
					{/*		size="medium"*/}
					{/*		control={control}*/}
					{/*		label="Training type"*/}
					{/*		type="text"*/}
					{/*	>*/}
					{/*		{trainingType.map((item: string) => (*/}
					{/*			<MenuItem key={fancyId()} value={item}>*/}
					{/*				{item}*/}
					{/*			</MenuItem>*/}
					{/*		))}*/}
					{/*	</FormInputText>*/}
					{/*</Grid>*/}

					<Grid item xs={12}>
						{educationComponent
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
									<EducationTextFields
										id={item.id}
										control={control}
										educationLevel={educationLevel}
										handleDelete={handleRemoveEducationTextFields}
										fromDate={fromDate}
										setFromDate={setFromDate}
										setToDate={setToDate}
										toDate={toDate}
										handleCurrentSchoolSelect={handleCurrentSchoolSelect}
										isCurrentSchool={isCurrentSchool}
									/>
								</Stack>
							))}
					</Grid>

					<Grid item xs={12}>
						<Button
							startIcon={<AddCircle fontSize="large" />}
							variant="contained"
							onClick={handleAddEducationTextFields}
							sx={{ fontWeight: "medium", color: "unset" }}
						>
							ADD EDUCATION LEVEL
						</Button>
					</Grid>
				</Grid>

				<ProfileBottomNavigation
					isSuccess={isSuccess}
					loading={loading}
					nextPageUrl="/create-profile/work"
					nextPageTitle="Work Experience"
				/>
			</form>
		</Container>
	);
};

CreateEducationPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateEducationPage;
