import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

const FormInputText = ({
	name,
	control,
	label,
	Icon,
	iconPosition,
	...rest
}: FormInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => {
				return (
					<TextField
						helperText={error ? error.message : null}
						size="small"
						error={!!error}
						onChange={onChange}
						value={value}
						fullWidth
						label={label}
						variant="outlined"
						{...rest}
					/>
				);
			}}
		/>
	);
};

export default FormInputText;
