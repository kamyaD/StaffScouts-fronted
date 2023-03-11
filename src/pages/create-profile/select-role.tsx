import Container from "@/components/Container";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import useStore from "@/store/index";
import fancyId from "@/utils/fancyId";
import { profileValidationSchema } from "@/utils/profileValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuBookTwoTone, WorkTwoTone } from "@mui/icons-material";
import {
	Box,
	Button,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import type { MouseEvent, ReactElement } from "react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export type CreateProfileTitleInputSchema = Pick<
	z.infer<typeof profileValidationSchema>,
	"job_title"
>;

const mock = [
	{
		title: "Graduate / Professional",
		icon: <MenuBookTwoTone color="action" />,
		value: "Graduate / Professional",
	},
	{
		title: "Skilled / Semi-skilled Workers",
		icon: <WorkTwoTone color="action" />,
		value: "Skilled / Semi-skilled Workers",
	},
];

const CreateRolePage: NextPageWithAuthAndLayout = () => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});
	const { push } = useRouter();

	const [alignment, setAlignment] = useState("...");
	const [requestLoading, setRequestLoading] = useState<boolean>(false);
	const { displaySnackMessage, setProfile } = useStore();
	const { handleSubmit, control } = useForm<CreateProfileTitleInputSchema>({
		mode: "onChange",
		resolver: zodResolver(profileValidationSchema),
	});

	// useEffect(() => {
	// 	switch (alignment) {
	// 		case "candidate":
	// 			setActiveState("candidate");
	// 			return;
	// 		case "employer":
	// 			setActiveState("employer");
	// 			return;
	// 		default:
	// 			setActiveState("...");
	// 			return;
	// 	}
	// }, [alignment]);

	// const { mutate: createProfile } = useMutation(
	// 	(profileTitle: CreateProfileTitleInputSchema) =>
	// 		createProfileFn(profileTitle),
	// 	{
	// 		onMutate() {
	// 			setRequestLoading(true);
	// 		},
	// 		onSuccess() {
	// 			setRequestLoading(false);
	// 			displaySnackMessage({
	// 				message: "Profile title updated successful.",
	// 			});
	// 		},
	// 		onError(error: any) {
	// 			setRequestLoading(false);
	// 			console.log("Class: , Function: onError, Line 43 error():", error);
	// 			if (Array.isArray((error as any).response.data.error)) {
	// 				(error as any).response.data.error.forEach((el: any) =>
	// 					displaySnackMessage({
	// 						message: el.message,
	// 						severity: "error",
	// 					}),
	// 				);
	// 			} else {
	// 				displaySnackMessage({
	// 					message: (error as any).response.data.message,
	// 					severity: "error",
	// 				});
	// 			}
	// 		},
	// 	},
	// );

	const onSubmit: SubmitHandler<CreateProfileTitleInputSchema> = (values) => {
		console.log("Class: , Function: onSubmit, Line 64 values():", values);
		setProfile(values);
	};

	const handleAlignment = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setAlignment(newAlignment);
		window.localStorage.setItem("professionalLevel", newAlignment);
	};

	const handlePushToDashboardViews = async () => {
		switch (alignment) {
			case "Graduate / Professional":
				await push("/create-profile/g/speciality");
				return;
			case "Skilled / Semi-skilled Workers":
				await push("/create-profile/s/speciality");
				return;
			default:
				return;
		}
	};

	return (
		<Container width={800} marginTop={16}>
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				<Box>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 700,
						}}
					>
						Select the professional level you are at.
					</Typography>
				</Box>
				<ToggleButtonGroup
					size="small"
					value={alignment}
					exclusive
					onChange={handleAlignment}
					aria-label="text alignment"
					sx={{
						marginTop: 4,
					}}
				>
					{mock.map((item) => (
						<Box
							key={fancyId()}
							value={item.value}
							component={ToggleButton}
							paddingX={4}
							width={1}
							height="200px"
							marginX={0}
							marginY={2}
						>
							<Stack
								direction="column"
								justifyContent="center"
								alignItems="flex-start"
								width={200}
							>
								<Stack
									direction="column"
									justifyContent="space-around"
									alignItems="center"
									spacing={4}
								>
									<Typography
										variant={"h6"}
										gutterBottom
										sx={{ fontWeight: 500 }}
									>
										{item.title}
									</Typography>
								</Stack>
							</Stack>
						</Box>
					))}
				</ToggleButtonGroup>
				<Box
					display="flex"
					flexDirection={{ xs: "column", sm: "row" }}
					alignItems={{ xs: "stretched", sm: "flex-start" }}
					justifyContent={"center"}
					marginTop={isMd ? 12 : 4}
				>
					<Button
						variant="contained"
						color="primary"
						size="large"
						fullWidth={!isMd}
						disabled={alignment === "..." || alignment === null}
						onClick={handlePushToDashboardViews}
						endIcon={
							!(alignment === "..." || alignment === null) ? (
								<Box
									component="svg"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									width={24}
									height={24}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</Box>
							) : null
						}
					>
						{`Proceed as a ${
							alignment ? alignment.split("-").join(" ") : "..."
						}`}
					</Button>
				</Box>
			</Stack>
		</Container>
	);
};

CreateRolePage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreateRolePage;
