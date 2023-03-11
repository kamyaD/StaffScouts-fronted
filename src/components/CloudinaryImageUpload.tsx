import { CloudUpload } from "@mui/icons-material";
import type { Theme } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import type { ChangeEvent } from "react";
import { Fragment } from "react";

const CLOUDINARY_UPLOAD_PRESET = "zes3n5np";
const CLOUDINARY_URL =
	"https://api.cloudinary.com/v1_1/mashafrancis/image/upload";

interface Props {
	label: string;
	placeholder?: string;
	onChange: (imageUrl: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		uploadButton: {
			marginLeft: theme.spacing(1),
		},
	}),
);

const CloudinaryImageUpload = ({ label, onChange, placeholder }: Props) => {
	const classes = useStyles();

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

			try {
				const response = await fetch(CLOUDINARY_URL, {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const data = await response.json();
					onChange(data.secure_url);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<TextField
			fullWidth
			variant="outlined"
			type="text"
			label={label}
			sx={{ marginTop: 2 }}
			InputProps={{
				endAdornment: (
					<Fragment>
						<input
							accept="image/*"
							type="file"
							style={{ display: "none" }}
							id="file-input"
							onChange={handleFileChange}
						/>
						<label htmlFor="file-input">
							<Button
								variant="contained"
								color="primary"
								component="span"
								className={classes.uploadButton}
								startIcon={<CloudUpload />}
							>
								Upload
							</Button>
						</label>
					</Fragment>
				),
			}}
		/>
	);
};

export default CloudinaryImageUpload;
