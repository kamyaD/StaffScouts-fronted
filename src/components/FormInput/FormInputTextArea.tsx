import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Controller } from "react-hook-form";

import type { FormInputProps } from "./FormInputProps";

const ValidationTextField = styled(TextareaAutosize)({
	"& label.Mui-focused": {
		color: "#677788",
	},
	"& input:valid:focus + fieldset": {
		borderLeftWidth: "6px !important",
		borderWidth: 2,
		padding: "4px !important",
	},
});

function FormInputTextArea({ name, control, label, ...rest }: FormInputProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<ValidationTextField
					// helperText={error ? error.message : null}
					// size="small"
					// error={!!error}
					onChange={onChange}
					value={value || ""}
					{...rest}
				/>
			)}
		/>
	);
}

export default FormInputTextArea;
