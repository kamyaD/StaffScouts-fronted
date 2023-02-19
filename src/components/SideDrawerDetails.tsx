import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// const DrawerHeader = styled('div')(({ theme }) => ({
// 	display: 'flex',
// 	alignItems: 'center',
// 	padding: theme.spacing(0, 1),
// 	// backgroundColor: alpha(theme.palette.divider, 0.1),
// 	// necessary for content to be below app bar
// 	...theme.mixins.toolbar,
// 	justifyContent: 'flex-start',
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	minHeight: "64px",
}));

interface Props {
	drawerTitle: string | JSX.Element;
	drawerBody: JSX.Element;
	isDrawerOpen: boolean;
	handleToggleDrawer: () => void;
	sideDrawerWidth?: number;
}

const SideDrawerDetails = ({
	drawerTitle,
	drawerBody,
	isDrawerOpen,
	handleToggleDrawer,
	sideDrawerWidth = 450,
}: Props): JSX.Element => {
	const theme = useTheme();

	return (
		<Drawer
			sx={{
				width: sideDrawerWidth,
				maxHeight: "100%",
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: sideDrawerWidth,
				},
			}}
			variant="persistent"
			anchor="right"
			open={isDrawerOpen}
		>
			{/*<Toolbar variant={'dense'} />*/}
			<Box height={1}>
				<DrawerHeader
					sx={{
						flexGrow: 1,
						display: "flex",
						justifyContent: "flex-start",
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
					>
						<IconButton
							aria-label="close"
							// sx={{
							// 	color: (theme) => theme.palette.primary.main,
							// }}
							onClick={handleToggleDrawer}
						>
							{theme.direction === "rtl" ? <ArrowBack /> : <ArrowForward />}
						</IconButton>
						{drawerTitle}
					</Stack>
				</DrawerHeader>
				<Divider />
				{drawerBody}
			</Box>
		</Drawer>
	);
};

export default SideDrawerDetails;
