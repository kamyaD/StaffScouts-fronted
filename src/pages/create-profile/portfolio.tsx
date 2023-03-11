import Container from "@/components/Container";
import PortfolioTextFields from "@/components/PortfolioTextFields";
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

const CreatePortfolioPage: NextPageWithAuthAndLayout = () => {
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
				Portfolio
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
							List different portfolio projects to boost your chances of getting
							hired
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
									<PortfolioTextFields
										id={item.id}
										control={control}
										handleDelete={handleRemoveEducationTextFields}
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
							ADD PORTFOLIO
						</Button>
					</Grid>
				</Grid>

				<ProfileBottomNavigation
					nextPageUrl="/create-profile/work"
					nextPageTitle="Finish"
				/>
			</form>
		</Container>
	);
};

CreatePortfolioPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreatePortfolioPage;
