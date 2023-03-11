import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

import type { FormInputProps } from "./FormInputProps";

function FormInputDate({ name, control, label, ...rest }: FormInputProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Controller
				name={name}
				control={control}
				render={({
					field: { onChange, value },
					fieldState: { error },
					formState,
				}) => (
					<DatePicker
						label={label}
						value={value}
						onChange={onChange}
						sx={{ width: "100%" }}
					/>
				)}
			/>
		</LocalizationProvider>
	);
}

export default FormInputDate;
