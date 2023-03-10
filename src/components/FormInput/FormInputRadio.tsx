import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

import fancyId from "../../utils/fancyId";
import type { FormInputProps } from "./FormInputProps";

const options = [
	{
		label: "Radio Option 1",
		value: "1",
	},
	{
		label: "Radio Option 2",
		value: "2",
	},
];

function FormInputRadio({ name, control, label }: FormInputProps) {
	const generateRadioOptions = () =>
		options.map((singleOption) => (
			<FormControlLabel
				key={fancyId()}
				value={singleOption.value}
				label={singleOption.label}
				control={<Radio />}
			/>
		));

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{label}</FormLabel>
			<Controller
				name={name}
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
					formState,
				}) => (
					<RadioGroup value={value} onChange={onChange}>
						{generateRadioOptions()}
					</RadioGroup>
				)}
			/>
		</FormControl>
	);
}

export default FormInputRadio;
