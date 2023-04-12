import { updateProfileFn } from "@/lib/api";
import type { Theme } from "@mui/material";
import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	Tooltip,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import type { SyntheticEvent } from "react";
import { useCallback } from "react";
import { Controller, useController } from "react-hook-form";

import useStore from "../store";

const CLOUDINARY_UPLOAD_PRESET = "zes3n5np";
const CLOUDINARY_URL =
	"https://api.cloudinary.com/v1_1/mashafrancis/image/upload";

type ImageUploadProps = {
	name: string;
	control: any;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			width: theme.spacing(10),
			height: theme.spacing(10),
		},
		avatarLoading: {
			width: theme.spacing(14),
			height: theme.spacing(14),
			position: "absolute",
			top: 0,
			left: -6,
			zIndex: 1,
		},
	}),
);

const ImageUpload = ({ name, control }: ImageUploadProps) => {
	const { authUser, setAuthUser } = useStore();
	const { field } = useController({ name, control });
	const store = useStore();
	const classes = useStyles();

	const onFileDrop = useCallback(
		async (e: SyntheticEvent<EventTarget>) => {
			const target = e.target as HTMLInputElement;
			if (!target.files) return;
			const newFile = Object.values(target.files).map((file: File) => file);
			const formData = new FormData();
			formData.append("file", newFile[0]);
			formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

			store.setUploadingImage(true);
			const data = await fetch(CLOUDINARY_URL, {
				method: "POST",
				body: formData,
			})
				.then(async (res) => {
					store.setUploadingImage(false);

					const data = await res.json();

					const userResponse = await updateProfileFn({
						...authUser,
						profile_pic: data?.secure_url as string,
					});

					setAuthUser(userResponse);

					return data;
				})
				.catch((err) => {
					store.setUploadingImage(false);
					console.log(err);
					store.displaySnackMessage({
						message: (err as any).message,
						severity: "error",
					});
				});

			if (data.secure_url) {
				field.onChange(data.secure_url);
			}
		},

		[field, store],
	);

	return (
		<Controller
			name={name}
			defaultValue=""
			control={control}
			render={({
				field: { name, onBlur, ref },
				fieldState: { error },
				formState,
			}) => (
				<Tooltip title="Change photo" placement="top-end">
					<Box sx={{ m: 10, position: "relative" }}>
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
						>
							<input
								type="file"
								hidden
								name={name}
								onBlur={onBlur}
								ref={ref}
								onChange={onFileDrop}
								multiple={false}
								accept="image/jpg, image/png, image/jpeg"
							/>
							<Avatar
								src={authUser?.profile_pic as string}
								className={classes.avatar}
							/>
						</IconButton>
						{store.uploadingImage && (
							<CircularProgress
								sx={{
									position: "absolute",
									top: "40%",
									left: "40%",
									marginTop: "-12px",
									marginLeft: "-12px",
								}}
							/>
						)}
					</Box>
				</Tooltip>
			)}
		/>
	);
};

export default ImageUpload;
