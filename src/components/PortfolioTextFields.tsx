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
	handlePortfolioImagesUploadChange: (url: string) => void;
	handlePortfolioVideosUploadChange: (url: string) => void;
	handlePortfolioDocumentsUploadChange: (url: string) => void;
}

const PortfolioTextFields = ({
	id,
	control,
	handleDelete,
	handlePortfolioVideosUploadChange,
	handlePortfolioImagesUploadChange,
	handlePortfolioDocumentsUploadChange,
	...rest
}: Props) => {
	return (
		<Fragment>
			<Grid item xs={11}>
				<FormInputText
					name="project_title"
					margin="dense"
					size="medium"
					control={control}
					label="Project title"
					type="text"
				/>
				<FormInputText
					name="project_description"
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
					onChange={handlePortfolioImagesUploadChange}
				/>
				<CloudinaryImageUpload
					label="Project videos"
					onChange={handlePortfolioVideosUploadChange}
				/>
				<CloudinaryImageUpload
					label="Project documents"
					onChange={handlePortfolioDocumentsUploadChange}
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
