import Container from "@/components/Container";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import SpecialityAndSkillsTextFields from "@/components/SpecialityAndSkillsTextFields";
import { Minimal } from "@/layouts/index";
import { createProfileFn, getSpecialityFn } from "@/lib/api";
import useStore from "@/store/index";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export const getStaticProps = async () => {
	const [allSpeciality] = await Promise.all([getSpecialityFn()]);

	return {
		props: {
			allSpeciality: allSpeciality.filter(
				(skills) => skills.type === "skilled",
			),
		},
	};
};

export type CreateProfileSpecialityInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	"speciality" | "skills"
>;

const CreateProfessionalSkillsPage = ({ allSpeciality }) => {
	let allSpecialtiesData = [];
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const [speciality, setSpeciality] = useState(allSpeciality);
	const [specialitiesSelected, setSelectedSpecialities] = useState<
		Array<string>
	>([]);
	const [specialityAndSkillsComp, setSpecialityAndSkillsComp] = useState<
		Array<Record<string, number>>
	>([{ id: 0 }]);
	const { displaySnackMessage, profile } = useStore();

	// const handleToggle = (value: number) => () => {
	// 	const currentIndex = skillsChecked.indexOf(value);
	// 	const newChecked = [...skillsChecked];
	//
	// 	if (currentIndex === -1) {
	// 		newChecked.push(value);
	// 	} else {
	// 		newChecked.splice(currentIndex, 1);
	// 	}
	//
	// 	setSkillsChecked(newChecked);
	// };

	// const handleSelectSpecialityChange = (event: SelectChangeEvent<typeof skillType>) => {
	// 	const {
	// 		target: { value },
	// 	} = event;
	// 	setSkillType(typeof value === "string" ? value.split(",") : value);
	// };

	const { control, watch, handleSubmit } =
		useForm<CreateProfileSpecialityInputSchema>({
			mode: "onChange",
			resolver: zodResolver(profileValidationSchema),
		});

	const specialism = watch("speciality");

	const allSpecialties = useMemo(
		() =>
			speciality
				?.filter((item) => item.specialty === specialism)[0]
				?.specific_specialty.trim(),
		[speciality, specialism],
	);

	if (typeof allSpecialties !== "undefined") {
		allSpecialtiesData = JSON.parse(allSpecialties);
	}

	const { mutate: createProfile } = useMutation(
		(profileSpeciality: CreateProfileSpecialityInputSchema) =>
			createProfileFn(profileSpeciality),
		{
			onMutate() {
				setRequestLoading(true);
			},
			onSuccess() {
				setRequestLoading(false);
				displaySnackMessage({
					message: "Profile speciality updated successful.",
				});
			},
			onError(error: any) {
				setRequestLoading(false);
				console.log("Class: , Function: onError, Line 43 error():", error);
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
		},
	);

	const onSubmit: SubmitHandler<CreateProfileSpecialityInputSchema> = (
		values,
	) => {
		console.log("Class: , Function: onSubmit, Line 162 values():", values);
		// createProfile(values);
	};

	const handleAddSpecialityAndSkillsTextFields = () => {
		setSpecialityAndSkillsComp((prevState) =>
			prevState.concat({ id: prevState[0].id++ }),
		);
		setSpeciality((prevState) =>
			prevState.filter((item) => item.specialty !== specialism),
		);
		const filteredSpeciality = speciality.filter(
			(item) => item.specialty === specialism,
		);
		setSelectedSpecialities((prevState) => [
			...prevState,
			filteredSpeciality[0].specialty,
		]);
	};

	const handleRemoveSpecialityAndSkillsTextFields = (id: number) =>
		setSpecialityAndSkillsComp((prevState) =>
			prevState.filter((item) => item.id !== id),
		);

	return (
		<Container maxWidth={720}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				What work would you want to do with us?
			</Typography>

			<form
				name="profile-speciality"
				method="post"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid container spacing={4} marginTop={0}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={0}
							sx={{
								fontWeight: 500,
							}}
						>
							Your skills show clients what you can offer and help us choose
							which jobs to recommend to you. Add or remove the ones we&lsquo;ve
							suggested, or scroll from our list below. It&lsquo;s up to you.
						</Typography>
					</Grid>

					<Grid item xs={12}>
						{specialityAndSkillsComp
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
									<SpecialityAndSkillsTextFields
										id={item.id}
										name="speciality"
										control={control}
										label="Speciality"
										allSpeciality={speciality}
										allSpecialtiesData={allSpecialtiesData}
										specialism={specialism}
										handleDelete={handleRemoveSpecialityAndSkillsTextFields}
									/>
								</Stack>
							))}
					</Grid>

					<Grid item xs={12}>
						<Button
							startIcon={<Add />}
							variant="outlined"
							onClick={handleAddSpecialityAndSkillsTextFields}
							sx={{ fontWeight: "medium", color: "unset" }}
						>
							ADD SPECIALITY
						</Button>
					</Grid>
				</Grid>
				{/*<input type="submit" value="submit"/>*/}
				{/*<LoadingButton*/}
				{/*	variant="contained"*/}
				{/*	type="submit"*/}
				{/*	color="primary"*/}
				{/*	size="large"*/}
				{/*	loading={requestLoading}*/}
				{/*	loadingPosition="end"*/}
				{/*	// onClick={handleNext}*/}
				{/*	// endIcon={*/}
				{/*	// 	theme.direction === "rtl" ? (*/}
				{/*	// 		<KeyboardArrowLeft />*/}
				{/*	// 	) : (*/}
				{/*	// 		<KeyboardArrowRight />*/}
				{/*	// 	)*/}
				{/*	// }*/}
				{/*>*/}
				{/*	{"Next"}*/}
				{/*</LoadingButton>*/}
				<ProfileBottomNavigation
					loading={requestLoading}
					nextPageUrl="/create-profile/bio"
					nextPageTitle="Add your bio"
				/>
			</form>
		</Container>
	);
};

CreateProfessionalSkillsPage.getLayout = function getLayout(
	page: ReactElement,
) {
	return <Minimal>{page}</Minimal>;
};

export default CreateProfessionalSkillsPage;
