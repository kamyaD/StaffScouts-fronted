import { removeDuplicates } from "@/utils/misc";
import { CheckBox, CheckBoxOutlineBlank, Clear } from "@mui/icons-material";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

interface Props {
	id: number;
	name: string;
	control: any;
	label: string;
	allSpeciality: any;
	specialism: any;
	allSpecialtiesData: any;
	handleDelete: (id: number) => void;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const WorkExperienceTextFields = ({
	id,
	control,
	name,
	label,
	allSpeciality,
	specialism,
	allSpecialtiesData,
	handleDelete,
	...rest
}: Props) => {
	return (
		<Fragment>
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

export default WorkExperienceTextFields;
