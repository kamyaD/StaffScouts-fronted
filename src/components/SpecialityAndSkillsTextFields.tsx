import fancyId from "@/utils/fancyId";
import { removeDuplicates } from "@/utils/misc";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, Chip, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
	name: string;
	control: any;
	label: string;
	allSpeciality: any;
	specialism: any;
	allSpecialtiesData: any;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const SpecialityAndSkillsTextFields = ({
	control,
	name,
	label,
	allSpeciality,
	specialism,
	allSpecialtiesData,
	...rest
}: Props) => {
	return (
		<Grid item xs={11}>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange }, fieldState: { error } }) => (
					<Autocomplete
						{...rest}
						id="add-speciality"
						options={removeDuplicates(
							allSpeciality.map((item) => item.specialty),
						)}
						onChange={(_, data) => onChange(data)}
						renderInput={(params) => (
							<TextField
								{...params}
								name="speciality"
								size="medium"
								margin="dense"
								label={label}
								placeholder=""
								error={!!error}
								helperText={error ? error.message : null}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="skills"
				control={control}
				// onChange={([, data]) => data}
				render={({
					field: { onChange, value, ...props },
					fieldState: { error },
				}) => (
					<Autocomplete
						{...props}
						id="add-skills"
						multiple
						disabled={!specialism}
						// limitTags={3}
						disableCloseOnSelect
						options={allSpecialtiesData.map((item) => item)}
						// freeSolo
						onChange={(_, data) => onChange(data)}
						getOptionLabel={(option) => option}
						// value={value || null}
						renderTags={(
							value: string[],
							getTagProps: (arg0: { index: number }) => JSX.IntrinsicAttributes,
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
								<Checkbox
									icon={icon}
									checkedIcon={checkedIcon}
									style={{ marginRight: 8 }}
									checked={selected}
								/>
								{option}
							</li>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								name="skills"
								size="medium"
								margin="dense"
								label="Skills"
								placeholder={!!value ? "+ Add more skills" : "+ Add a skill"}
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
	);
};

export default SpecialityAndSkillsTextFields;
