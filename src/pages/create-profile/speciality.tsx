import Container from "@/components/Container";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import SpecialityAndSkillsTextFields from "@/components/SpecialityAndSkillsTextFields";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import { getSpecialityFn } from "@/lib/api";
import isBrowser from "@/utils/isBrowser";
import { stringifyMap } from "@/utils/misc";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCircle } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export const getStaticProps = async () => {
	const [allSpeciality] = await Promise.all([getSpecialityFn()]);

	return {
		props: {
			allSpeciality,
		},
	};
};

type CreateProfileSpecialityInputSchema = z.infer<
	typeof profileValidationSchema
>;

const CreateProfessionalSkillsPage = ({ allSpeciality }) => {
	let allSpecialtiesData = [];
	const professionalLevel = isBrowser
		? window.localStorage.getItem("professionalLevel")
		: "";
	const skillType =
		professionalLevel === "Skilled / Semi-skilled Workers"
			? "semi-skilled"
			: "skilled";

	const [speciality, setSpeciality] = useState(
		allSpeciality.filter((skills) => skills.type === skillType),
	);
	const [specialitiesSelected, setSelectedSpecialities] = useState(
		new Map<string, string[]>(),
	);
	const [specialityAndSkillsComp, setSpecialityAndSkillsComp] = useState<
		Array<Record<string, number | string>>
	>([{ id: 0, specialism: "" }]);

	const [removedSpeciality, setRemovedSpeciality] = useState<
		Set<Record<string, string>>
	>(new Set());

	const { control, watch, handleSubmit } =
		useForm<CreateProfileSpecialityInputSchema>({
			mode: "onChange",
			resolver: zodResolver(profileValidationSchema),
		});

	const specialism = watch("speciality");
	const skills = watch("specialitySkills");

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

	const { loading, updateProfile } = useUpdateProfile();

	const onSubmit = () => {
		const skills = stringifyMap(specialitiesSelected);
		updateProfile({ skills });
	};

	useEffect(() => {
		setSelectedSpecialities(
			(prevMap) => new Map(prevMap.set(specialism, skills)),
		);
	}, [skills, specialism]);

	const handleAddSpecialityAndSkillsTextFields = () => {
		setSpecialityAndSkillsComp((prevState) =>
			prevState.concat({
				id: (prevState[0].id as number)++,
				specialism: specialism,
			}),
		);
		setSpeciality((prevState) => {
			const removedValue = prevState.find(
				(item) => item.specialty === specialism,
			);
			setRemovedSpeciality((prevSet) => new Set([...prevSet, removedValue]));
			return prevState.filter((item) => item.specialty !== specialism);
		});
	};

	const handleRemoveSpecialityAndSkillsTextFields = (id: number) => {
		setSpecialityAndSkillsComp((prevState) =>
			prevState.filter((item) => item.id !== id),
		);

		const specialityToBeAddedBack: string = specialityAndSkillsComp.filter(
			(item) => item.id === id,
		)[0].specialism as string;

		let tempSpecialityValue;
		removedSpeciality.forEach((item) => {
			if (item.specialty === specialityToBeAddedBack) {
				tempSpecialityValue = item;
			}
		});

		setSpeciality((prevState) => [...prevState, tempSpecialityValue]);

		const newSpecialitiesSelected = new Map(specialitiesSelected);
		newSpecialitiesSelected.delete(specialityToBeAddedBack);
		setSelectedSpecialities(newSpecialitiesSelected);
	};

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
							.sort((a, b) => +a.id - +b.id)
							.map((item) => (
								<Stack
									direction="row"
									alignItems="stretch"
									spacing={2}
									key={item.id}
									marginBottom={4}
								>
									<SpecialityAndSkillsTextFields
										id={item.id as number}
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
							startIcon={<AddCircle fontSize="large" />}
							variant="contained"
							onClick={handleAddSpecialityAndSkillsTextFields}
							sx={{ fontWeight: "medium", color: "unset" }}
						>
							ADD SPECIALITY
						</Button>
					</Grid>
				</Grid>
				<ProfileBottomNavigation
					loading={loading}
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
