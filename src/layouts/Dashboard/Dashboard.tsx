import Container from "@/components/Container";
import LinearProgressBar from "@/components/LinearProgressBar";
import { DashboardContext } from "@/context/DashboardContext";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import { alpha, styled, useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { memo, useContext, useEffect, useState } from "react";

import { candidatesLayoutNavigation } from "../navigation";
import { Sidebar, Topbar } from "./components";
import { drawerWidth } from "./components/Sidebar/Sidebar";

export const sideDrawerWidth = 450;

interface Props {
	children: ReactNode;
	isSideDrawerOpen?: boolean;
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const Main = styled("main", {
	shouldForwardProp: (prop) => prop !== "open",
})<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	display: "flex",
	flex: "1 1 auto",
	overflow: "hidden",
	marginLeft: `${drawerWidth}px`,
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginRight: 0,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: sideDrawerWidth,
	}),
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${sideDrawerWidth}px)`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		mr: `${sideDrawerWidth}px`,
	}),
}));

const useMounted = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return mounted;
};

const Dashboard = ({
	children,
	isSideDrawerOpen = false,
}: Props): JSX.Element => {
	const { isSidebarOpen, handleSidebar } = useContext(DashboardContext);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});
	const isMounted = useMounted();

	return (
		<Box
			sx={{
				height: "100vh",
				flexGrow: 1,
			}}
		>
			<AppBar
				position="fixed"
				sx={{
					background: theme.palette.alternate.main,
					// background: theme.palette.primary.main,
					zIndex: theme.zIndex.drawer + 10,
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Toolbar variant={"dense"}>
					<Container maxWidth={1} paddingY={{ xs: 0 }} paddingX={0}>
						<Topbar />
					</Container>
				</Toolbar>
			</AppBar>
			<Toolbar variant={"dense"} />
			<Sidebar
				onSidebarClose={handleSidebar}
				open={isSidebarOpen}
				variant={isMd ? "permanent" : "temporary"}
				pages={candidatesLayoutNavigation}
			/>
			<Main open={isSideDrawerOpen}>
				<Container
					sx={{ position: "relative" }}
					maxWidth={{
						sm: 720,
						md: "100%",
					}} // Replace md with 1440px if it doesn't work
					width={1}
					paddingY={{ xs: 0 }}
					paddingX={{ xs: 0 }}
				>
					<Toolbar variant={"dense"} />
					{isMounted ? children : <LinearProgressBar />}
				</Container>
			</Main>
		</Box>
	);
};

export default memo(Dashboard);
