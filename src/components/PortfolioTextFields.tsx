import CloudinaryImageUpload from "@/components/CloudinaryImageUpload";
import { FormInputText } from "@/components/FormInput";
import { Clear } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Fragment } from "react";

interface Props {
	id: number;
	control: any;
	label?: string;
	handleDelete: (id: number) => void;
}

const PortfolioTextFields = ({ id, control, handleDelete, ...rest }: Props) => {
	const handlePhotoUploadChange = (url: string) => {
		return url;
	};

	return (
		<Fragment>
			<Grid item xs={11}>
				<FormInputText
					name="projectTitle"
					margin="dense"
					size="medium"
					control={control}
					label="Project title"
					type="text"
				/>
				<FormInputText
					name="projectDescription"
					margin="dense"
					size="medium"
					control={control}
					label="Project description"
					placeholder=""
					type="text"
					multiline
					rows={4}
				/>
				<CloudinaryImageUpload
					label="Project images"
					onChange={handlePhotoUploadChange}
				/>
				<CloudinaryImageUpload
					label="Project videos"
					onChange={handlePhotoUploadChange}
				/>
				<CloudinaryImageUpload
					label="Project documents"
					onChange={handlePhotoUploadChange}
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

export default PortfolioTextFields;
