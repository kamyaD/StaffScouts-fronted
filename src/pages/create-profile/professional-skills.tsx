import Container from "@/components/Container";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import SideDrawerDetails from "@/components/SideDrawerDetails";
import SpecialityAndSkillsTextFields from "@/components/SpecialityAndSkillsTextFields";
import { Minimal } from "@/layouts/index";
import { createProfileFn, getSpecialityFn } from "@/lib/api";
import useStore from "@/store/index";
import fancyId from "@/utils/fancyId";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Clear } from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
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
	const [isSkillsDetailsOpen, setSkillsDetailsOpen] = useState<boolean>(false);
	const [skillsChecked, setSkillsChecked] = useState([]);
	const [specialityAndSkillsComp, setSpecialityAndSkillsComp] = useState<
		Array<Record<string, number>>
	>([{ id: 0 }]);
	const { displaySnackMessage, profile } = useStore();

	const handleToggle = (value: number) => () => {
		const currentIndex = skillsChecked.indexOf(value);
		const newChecked = [...skillsChecked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setSkillsChecked(newChecked);
	};

	const theme = useTheme();

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

	useEffect(() => {
		setSkillsDetailsOpen(specialism?.length > 0);
	}, [specialism]);

	const allSpecialties = useMemo(
		() =>
			allSpeciality
				?.filter((item) => item.specialty === specialism)[0]
				?.specific_specialty.trim(),
		[allSpeciality, specialism],
	);

	if (typeof allSpecialties !== "undefined") {
		allSpecialtiesData = JSON.parse(allSpecialties);
	}

	const toggleDrawerSkills = () => {
		setSkillsDetailsOpen((prevState) => !prevState);
	};

	const renderSkillsBody = () => (
		<Box padding={1} sx={{ backgroundColor: "#ffffff" }}>
			<FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
				<FormGroup>
					{allSpecialtiesData?.map((value) => (
						<FormControlLabel
							key={fancyId()}
							control={
								<Checkbox
									checked={skillsChecked.indexOf(value) !== -1}
									onChange={handleToggle(value)}
									name={value}
								/>
							}
							label={value}
						/>
					))}
				</FormGroup>
			</FormControl>
		</Box>
	);

	const renderSpecialismSkills = () => {
		return (
			<SideDrawerDetails
				drawerTitle={specialism}
				drawerBody={renderSkillsBody()}
				isDrawerOpen={isSkillsDetailsOpen}
				handleToggleDrawer={toggleDrawerSkills}
			/>
		);
	};

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
		createProfile(values);
	};

	console.log(
		"Class: , Function: CreateProfessionalSkillsPage, Line 190 specialism():",
		specialism,
	);

	// const compareIds = (a, b) => {
	// 	if (a.id > b.id) return -1;
	// 	if (a.id < b.id) return 1;
	// 	return 0;
	// }

	const compareIds = (a, b) => a.id - b.id;

	const handleAddSpecialityAndSkillsTextFields = () =>
		setSpecialityAndSkillsComp((prevState) =>
			prevState.concat({ id: prevState[0].id++ }),
		);

	const handleRemoveSpecialityAndSkillsTextFields = (id: number) =>
		setSpecialityAndSkillsComp((prevState) =>
			prevState.filter((item) => item.id !== id),
		);

	console.log(
		"Class: , Function: CreateProfessionalSkillsPage, Line 188 specialityAndSkillsComp():",
		specialityAndSkillsComp.slice().sort((a, b) => a.id - b.id),
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
										name="speciality"
										control={control}
										label="Speciality"
										allSpeciality={allSpeciality}
										allSpecialtiesData={allSpecialtiesData}
										specialism={specialism}
										// handleDelete={handleRemoveSpecialityAndSkillsTextFields}
									/>
									{item.id > 0 ? (
										<IconButton
											aria-label="delete"
											onClick={() =>
												handleRemoveSpecialityAndSkillsTextFields(item.id)
											}
										>
											<Clear color="error" />
										</IconButton>
									) : null}
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

					{/*<Grid item xs={12}>*/}
					{/*	<Typography sx={{ marginLeft: 1 }} borderBottom={1}>*/}
					{/*		Data Science*/}
					{/*	</Typography>*/}
					{/*	{skillsChecked.map((option: string) => (*/}
					{/*		<Chip*/}
					{/*			key={fancyId()}*/}
					{/*			color="primary"*/}
					{/*			label={option}*/}
					{/*			sx={{ margin: 0.5 }}*/}
					{/*		/>*/}
					{/*	))}*/}
					{/*</Grid>*/}
				</Grid>
				{/*{renderSpecialismSkills()}*/}
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