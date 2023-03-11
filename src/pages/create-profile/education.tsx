import Container from "@/components/Container";
import EducationTextFields from "@/components/EducationTextFields";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import isBrowser from "@/utils/isBrowser";
import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import { Add } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const CreateEducationPage: NextPageWithAuthAndLayout = () => {
	const [educationComponent, setEducationComponent] = useState<
		Array<Record<string, number>>
	>([{ id: 0 }]);
	const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs("2022-04-17"));
	const [toDate, setToDate] = useState<Dayjs | null>(dayjs("2022-04-17"));

	const professionalLevel = isBrowser
		? window.localStorage.getItem("professionalLevel")
		: "";
	const educationLevel =
		professionalLevel === "Graduate / Professional"
			? graduateEducationLevel
			: semiSkilledEducationLevel;

	const { control } = useForm<RegisterInputSchema>({
		mode: "onChange",
	});

	const handleAddEducationTextFields = () => {
		setEducationComponent((prevState) =>
			prevState.concat({ id: prevState[0].id++ }),
		);
		// setSpeciality((prevState) =>
		// 	prevState.filter((item) => item.specialty !== specialism),
		// );
		// // const filteredSpeciality = speciality.filter(item => item.specialty === specialism)
		// setSelectedSpecialities((map) => new Map(map.set(specialism, skills)));
		// updateSpeciality(specialism, skills)

		// const obj = { `${key}`: filteredSpeciality[0].specialty }
		// setSelectedSpecialities(prevState => Object.assign(prevState, obj))
	};

	const handleRemoveEducationTextFields = (id: number) => {
		setEducationComponent((prevState) =>
			prevState.filter((item) => item.id !== id),
		);
		// setSelectedSpecialities(map => map.delete(specialism))
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

			<form>
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
									/>
								</Stack>
							))}
					</Grid>

					<Grid item xs={12}>
						<Button
							startIcon={<Add />}
							variant="outlined"
							onClick={handleAddEducationTextFields}
							sx={{ fontWeight: "medium", color: "unset" }}
						>
							ADD EDUCATION LEVEL
						</Button>
					</Grid>
				</Grid>

				<ProfileBottomNavigation
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
