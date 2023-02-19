import Container from "@/components/Container";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import SideDrawerDetails from "@/components/SideDrawerDetails";
import { Minimal } from "@/layouts/index";
import { getSpecialityFn } from "@/lib/api";
import fancyId from "@/utils/fancyId";
import {
	Autocomplete,
	Box,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const getStaticProps = async () => {
	const [allSpeciality] = await Promise.all([getSpecialityFn()]);

	return {
		props: { allSpeciality },
	};
};

const validationSchema = z.object({
	speciality: z.string().nullish(),
});

export type SkillsInputSchema = z.infer<typeof validationSchema>;

const CreateSkillsPage = ({ allSpeciality }) => {
	let allSpecialtiesData = [];
	const [skillType, setSkillType] = useState<string[]>([]);
	const [speciality, setSpeciality] = useState<string>("");
	const [expanded, setExpanded] = useState<string | false>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [isSkillsDetailsOpen, setSkillsDetailsOpen] = useState<boolean>(false);

	const [skillsChecked, setSkillsChecked] = useState([]);

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

	const handleSelectSpecialityChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setSkillType({
			...skillType,
			[event.target.name]: event.target.checked,
		});
	};

	const { control, watch } = useForm<SkillsInputSchema>({
		mode: "onChange",
	});

	const specialism = watch("speciality");

	useEffect(() => {
		setSkillsDetailsOpen(specialism?.length > 0);
	}, [specialism]);

	const allSpecialties = allSpeciality
		?.filter((item) => item.specialty === specialism?.at(-1))[0]
		?.specific_specialty.trim();

	if (typeof allSpecialties !== "undefined") {
		allSpecialtiesData = JSON.parse(allSpecialties);
	}

	const toggleDrawerSkills = () => {
		setSkillsDetailsOpen((prevState) => !prevState);
	};

	console.log(
		"Class: , Function: CreateSkillsPage, Line 115 skillType():",
		skillsChecked,
	);

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
				drawerTitle={specialism?.at(-1)}
				drawerBody={renderSkillsBody()}
				isDrawerOpen={isSkillsDetailsOpen}
				handleToggleDrawer={toggleDrawerSkills}
			/>
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
				What work are you here to do?
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
							Your skills show clients what you can offer and help us choose
							which jobs to recommend to you. Add or remove the ones we&lsquo;ve
							suggested, or scroll from our list below. It&lsquo;s up to you.
						</Typography>
						<Controller
							name="speciality"
							control={control}
							// onChange={([, data]) => data}
							render={({
								field: { onChange, value, ...props },
								fieldState: { error },
							}) => (
								<Autocomplete
									{...props}
									id="add-speciality"
									multiple
									limitTags={3}
									disableCloseOnSelect
									options={allSpeciality.map((item) => item.specialty)}
									freeSolo
									onChange={(_, data) => onChange(data)}
									getOptionLabel={(option) => option}
									// value={value || null}
									renderTags={(
										value: string[],
										getTagProps: (arg0: {
											index: number;
										}) => JSX.IntrinsicAttributes,
									) =>
										value.map((option: string, index: number) => (
											<Chip
												key={fancyId()}
												color="primary"
												label={option}
												{...getTagProps({ index })}
											/>
										))
									}
									renderOption={(props, option, { selected }) => (
										<li {...props} key={fancyId()}>
											{option}
										</li>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											name="speciality"
											size="medium"
											margin="dense"
											label="Speciality"
											placeholder=""
											error={!!error}
											helperText={error ? error.message : null}
											inputProps={{
												...params.inputProps,
												onKeyDown: (e) => {
													if (e.key === "Enter" && error) {
														e.stopPropagation();
													}
												},
											}}
										/>
									)}
								/>
							)}
						/>
					</Grid>

					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							{skillsChecked.map((option: string) => (
								<Chip
									key={fancyId()}
									color="primary"
									label={option}
									sx={{ margin: 0.5 }}
								/>
							))}
						</Typography>
					</Grid>
				</Grid>
				{renderSpecialismSkills()}
				<ProfileBottomNavigation
					nextPageUrl="/create-profile/bio"
					nextPageTitle="Add your bio"
				/>
			</form>
		</Container>
	);
};

CreateSkillsPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateSkillsPage;
