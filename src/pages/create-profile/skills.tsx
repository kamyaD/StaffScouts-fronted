import Container from "@/components/Container";
import { FormInputText } from "@/components/FormInput";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { SelectChangeEvent } from "@mui/material";
import {
	Box,
	Chip,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Speciality } from "./fixtures";

const ITEM_HEIGHT = 96;
const ITEM_PADDING_TOP = 8;

const validationSchema = z.object({
	speciality: z.string().nullish(),
});

export type SkillsInputSchema = z.infer<typeof validationSchema>;

const CreateSkillsPage: NextPageWithAuthAndLayout = () => {
	const [skillType, setSkillType] = useState<string[]>([]);

	const theme = useTheme();
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
				border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
			},
		},
	};

	const handleSelectChange = (event: SelectChangeEvent<typeof skillType>) => {
		const {
			target: { value },
		} = event;
		setSkillType(typeof value === "string" ? value.split(",") : value);
	};

	const handleChipDelete = () => {};

	const { control, watch } = useForm<SkillsInputSchema>({
		mode: "onChange",
	});

	const specialism = Speciality[watch("speciality")] || [];

	console.log(
		"Class: , Function: CreateSkillsPage, Line 64 watch()():",
		specialism,
	);

	// useEffect(() => {
	// 	setSkillType([])
	// }, [specialism])

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
							Your skills show clients what you can other and help us choose
							which jobs to recommend to vou Add or remove the ones we&lsquo;ve
							suggested, or start typing to pick more. It&lsquo;s up to you.
						</Typography>

						{/*<Controller*/}
						{/*	// @ts-expect-error*/}
						{/*	name="skills"*/}
						{/*	control={control}*/}
						{/*	render={({ field: { onChange, value, ...props } }) => (*/}
						{/*		<FormControl sx={{ width: "100%" }}>*/}
						{/*			<InputLabel id="event-type-select">*/}
						{/*				Select speciality*/}
						{/*			</InputLabel>*/}
						{/*			<Select*/}
						{/*				labelId="speciality"*/}
						{/*				id="speciality"*/}
						{/*				value={skillType}*/}
						{/*				onChange={handleSelectChange}*/}
						{/*				input={<OutlinedInput label="Specialism" />}*/}
						{/*				renderValue={(selected) => (selected.value*/}
						{/*				)}*/}
						{/*				MenuProps={MenuProps}*/}
						{/*			>*/}
						{/*				{Object.keys(Speciality).map((event) => (*/}
						{/*					<MenuItem divider key={event} value={event}>*/}
						{/*						/!*<Checkbox checked={eventType.indexOf(event) > -1} />*!/*/}
						{/*						<ListItemText primary={event} />*/}
						{/*					</MenuItem>*/}
						{/*				))}*/}
						{/*			</Select>*/}
						{/*		</FormControl>*/}
						{/*	)}*/}
						{/*/>*/}

						<FormInputText
							select
							// autoFocus
							id="speciality"
							margin="dense"
							name="speciality"
							placeholder=""
							size="medium"
							control={control}
							label="Speciality"
							type="text"
							// MenuProps={MenuProps}
							// SelectProps={{
							// 	native: true,
							// }}
						>
							{Object.keys(Speciality)?.map((item: string) => (
								<MenuItem key={item} value={item}>
									{item}
								</MenuItem>
							))}
						</FormInputText>
					</Grid>

					<Grid item xs={12}>
						<Controller
							// @ts-expect-error
							name="skills"
							control={control}
							render={({ field: { onChange, value, ...props } }) => (
								<FormControl sx={{ width: "100%" }}>
									<InputLabel id="event-type-select">Select skills</InputLabel>
									<Select
										fullWidth
										disabled={specialism.length === 0}
										labelId="event type"
										id="event-type-select"
										multiple
										value={skillType}
										onChange={handleSelectChange}
										input={<OutlinedInput label="Filter by event" />}
										renderValue={(selected) => (
											<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
												{selected.map((value) => (
													<Chip
														key={value}
														label={value}
														size="small"
														onDelete={handleChipDelete}
													/>
												))}
											</Box>
										)}
										MenuProps={MenuProps}
									>
										{specialism.map((event) => (
											<MenuItem divider key={event} value={event}>
												{/*<Checkbox checked={eventType.indexOf(event) > -1} />*/}
												<ListItemText primary={event} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
					</Grid>
				</Grid>
			</form>

			<ProfileBottomNavigation
				nextPageUrl="/create-profile/bio"
				nextPageTitle="Add your bio"
			/>
		</Container>
	);
};

CreateSkillsPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateSkillsPage;
