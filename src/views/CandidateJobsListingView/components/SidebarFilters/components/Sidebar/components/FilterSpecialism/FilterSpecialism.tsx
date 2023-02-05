import { FormInputText } from "@/components/FormInput";
import fancyId from "@/utils/fancyId";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FilterSpecialism = ({
	specialisms,
}: {
	specialisms: any;
}): JSX.Element => {
	const [value, setValue] = useState([20, 400]);
	const [open, setOpen] = useState(true);

	const handleClick = (): void => {
		setOpen(!open);
	};

	const { handleSubmit, control, reset, formState } = useForm({
		mode: "onChange",
	});

	const specialism = !specialisms ? ["Loading"] : specialisms.results.map((item) => item.specialty)

	return (
		<Box>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				marginBottom={1}
				sx={{ cursor: "pointer" }}
				onClick={() => handleClick()}
			>
				<Typography fontWeight={700}>Select specialism</Typography>
				{open ? <ExpandLess /> : <ExpandMore />}
			</Box>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<Box>
					<FormInputText
						required
						select
						name="Select specialism"
						margin="dense"
						placeholder="Select specialism"
						value="Select specialism"
						size="small"
						control={control}
						label="Select specialism"
						type="text"
						disabled={!specialisms}
						SelectProps={{
							native: true,
						}}
					>
						{specialism.map((option: any) => (
							<option key={fancyId()} value={option}>
								{option}
							</option>
						))}
					</FormInputText>
				</Box>
			</Collapse>
		</Box>
	);
};

export default FilterSpecialism;
