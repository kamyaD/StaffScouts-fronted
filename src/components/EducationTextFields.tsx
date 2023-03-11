import { FormInputDate, FormInputText } from "@/components/FormInput";
import fancyId from "@/utils/fancyId";
import { CheckBox, CheckBoxOutlineBlank, Clear } from "@mui/icons-material";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	MenuItem,
	Stack,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

interface Props {
	id: number;
	control: any;
	label?: string;
	educationLevel: Array<string>;
	handleDelete: (id: number) => void;
	fromDate: Dayjs | null;
	toDate: Dayjs | null;
	setFromDate: any;
	setToDate: any;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const EducationTextFields = ({
	id,
	control,
	label,
	educationLevel,
	handleDelete,
	fromDate,
	toDate,
	setFromDate,
	setToDate,
	...rest
}: Props) => {
	return (
		<Fragment>
			<Grid item xs={11}>
				<FormInputText
					name="institution"
					margin="dense"
					size="medium"
					control={control}
					label="Institution name"
					type="text"
				/>
				<FormInputText
					select
					autoFocus={false}
					margin="dense"
					name="education_level"
					placeholder=""
					size="medium"
					control={control}
					label="Education level"
					type="text"
				>
					{educationLevel.map((item: string) => (
						<MenuItem key={fancyId()} value={item}>
							{item}
						</MenuItem>
					))}
				</FormInputText>
				<FormInputText
					name="course"
					margin="dense"
					size="medium"
					control={control}
					label="Course"
					type="text"
				/>
				<Stack
					marginTop={2}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
				>
					<FormInputDate name="fromDate" control={control} label="From date" />
					<FormInputDate name="toDate" control={control} label="To date" />

					<FormControl size="small" variant="outlined">
						<FormLabel component="legend">{label}</FormLabel>

						<div>
							<FormControlLabel
								control={
									<Controller
										name="currentSchool"
										control={control}
										render={({}) => (
											<Checkbox
											// checked={selectedItems?.includes(option.value)}
											// onChange={() => handleSelect(option.value)}
											/>
										)}
									/>
								}
								label="Current school"
							/>
						</div>
					</FormControl>

					{/*<Checkbox*/}
					{/*	label="Current school"*/}
					{/*	sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}*/}
					{/*/>*/}
				</Stack>

				{/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
				{/*	<Stack*/}
				{/*		direction="row"*/}
				{/*		justifyContent="center"*/}
				{/*		alignItems="center"*/}
				{/*		spacing={2}*/}
				{/*	>*/}
				{/*		<DatePicker*/}
				{/*			label="From date"*/}
				{/*			value={fromDate}*/}
				{/*			onChange={(newValue) => setFromDate(newValue)}*/}
				{/*		/>*/}
				{/*		<DatePicker*/}
				{/*			label="To date"*/}
				{/*			value={toDate}*/}
				{/*			onChange={(newValue) => setToDate(newValue)}*/}
				{/*		/>*/}
				{/*	</Stack>*/}
				{/*</LocalizationProvider>*/}

				{/*<FormInputText*/}
				{/*	name="bio"*/}
				{/*	margin="dense"*/}
				{/*	size="medium"*/}
				{/*	control={control}*/}
				{/*	label="Activities"*/}
				{/*	placeholder=""*/}
				{/*	type="text"*/}
				{/*	multiline*/}
				{/*	rows={4}*/}
				{/*/>*/}
			</Grid>
			<Grid item xs={1}>
				{id > 0 ? (
					<IconButton aria-label="delete" onClick={() => handleDelete(id)}>
						<Clear color="error" />
					</IconButton>
				) : null}
			</Grid>
		</Fragment>
	);
};

export default EducationTextFields;
