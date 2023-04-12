import Container from "@/components/Container";
import PortfolioTextFields from "@/components/PortfolioTextFields";
import ProfileBottomNavigation from "@/components/ProfileBottomNavigation";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import { stringifyMap } from "@/utils/misc";
import type { profileValidationSchema } from "@/utils/profileValidationSchema";
import { AddCircle } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type CreateProfilePortfolioInputSchema = z.infer<
	typeof profileValidationSchema
>;

const CreatePortfolioPage: NextPageWithAuthAndLayout = () => {
	const [imageUrls, setImageUrls] = useState<string>("");
	const [videoUrls, setVideoUrls] = useState<string>("");
	const [documentUrls, setDocumentUrls] = useState<string>("");
	const [portfolioComponent, setPortfolioComponent] = useState<
		Array<Record<string, any>>
	>([{ id: 0, portfolioExperience: "" }]);
	const [portfolioExperienceSelected, setPortfolioExperienceSelected] =
		useState(new Map<string, string[]>());

	const { control, watch, handleSubmit } =
		useForm<CreateProfilePortfolioInputSchema>({
			mode: "onChange",
		});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			setPortfolioExperienceSelected(
				(prevMap) => new Map(prevMap.set(name, value[name])),
			);
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const { loading, updateProfile, isSuccess } = useUpdateProfile();

	const onSubmit = () => {
		const portfolio = [];

		if (
			portfolioComponent.length === 1 &&
			portfolioExperienceSelected.has("company")
		) {
			portfolio.push(JSON.parse(stringifyMap(portfolioExperienceSelected)));
		}

		portfolioComponent.map((item) => {
			if (item.portfolioExperience !== "") {
				portfolio.push(JSON.parse(item.portfolioExperience));
			}
		});

		updateProfile({
			portfolio: JSON.stringify(portfolio),
		});
	};

	const handleAddPortfolioTextFields = () => {
		setPortfolioComponent((prevState) =>
			prevState.concat({
				id: prevState[0].id++ as number,
				portfolioExperience: stringifyMap(portfolioExperienceSelected),
			}),
		);
	};

	const handleRemovePortfolioTextFields = (id: number) => {
		setPortfolioComponent((prevState) =>
			prevState.filter((item) => item.id !== id),
		);
	};

	const handlePortfolioDocumentsUploadChange = (url: string) =>
		setDocumentUrls(url);
	const handlePortfolioImagesUploadChange = (url: string) => setImageUrls(url);
	const handlePortfolioVideosUploadChange = (url: string) => setVideoUrls(url);

	return (
		<Container maxWidth={720}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 700,
				}}
			>
				Portfolio
			</Typography>

			<form
				name="profile-portfolio"
				method="post"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid container spacing={4} marginTop={2}>
					<Grid item xs={12}>
						<Typography
							variant="body1"
							marginBottom={2}
							sx={{
								fontWeight: 500,
							}}
						>
							List different portfolio projects to boost your chances of getting
							hired
						</Typography>
					</Grid>

					<Grid item xs={12}>
						{portfolioComponent
							.slice()
							.sort((a, b) => a.id - b.id)
							.map((item) => (
								<Stack
									direction="row"
									alignItems="stretch"
									spacing={2}
									key={item.id}
									marginBottom={4}
								>
									<PortfolioTextFields
										id={item.id}
										control={control}
										handleDelete={handleRemovePortfolioTextFields}
										handlePortfolioDocumentsUploadChange={
											handlePortfolioDocumentsUploadChange
										}
										handlePortfolioImagesUploadChange={
											handlePortfolioImagesUploadChange
										}
										handlePortfolioVideosUploadChange={
											handlePortfolioVideosUploadChange
										}
									/>
								</Stack>
							))}
					</Grid>

					<Grid item xs={12}>
						<Button
							startIcon={<AddCircle fontSize="large" />}
							variant="contained"
							onClick={handleAddPortfolioTextFields}
							sx={{ fontWeight: "medium", color: "unset" }}
						>
							ADD PORTFOLIO
						</Button>
					</Grid>
				</Grid>

				<ProfileBottomNavigation
					isSuccess={isSuccess}
					loading={loading}
					nextPageUrl="/profile"
					nextPageTitle="Finish"
				/>
			</form>
		</Container>
	);
};

CreatePortfolioPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default CreatePortfolioPage;
