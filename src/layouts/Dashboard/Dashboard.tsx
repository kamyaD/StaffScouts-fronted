import Container from "@/components/Container";
import LinearProgressBar from "@/components/LinearProgressBar";
import { Footer } from "@/layouts/Main/components";
import { ScrollTop } from "@/layouts/Main/Main";
import { KeyboardArrowUpRounded } from "@mui/icons-material";
import { Box, Fab, useMediaQuery, useScrollTrigger } from "@mui/material";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import { alpha, styled, useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { memo, useEffect, useState } from "react";

import { Topbar } from "./components";
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
	const [openSidebar, setOpenSidebar] = useState(false);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});
	const isMounted = useMounted();

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	const handleSidebarOpen = (): void => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = (): void => {
		setOpenSidebar(false);
	};

	const open = isMd ? false : openSidebar;

	return (
		<Box
			sx={{
				height: "100vh",
				flexGrow: 1,
			}}
		>
			<AppBar
				position="sticky"
				sx={{
					top: 0,
					backgroundColor: trigger ? "hsla(0,0%,100%,.8)" : "transparent",
					backdropFilter: trigger ? "blur(15px)" : "none",
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					// borderBottom: trigger
					// 	? `1px solid ${alpha(theme.palette.divider, 0.1)}`
					// 	: 'none',
				}}
				elevation={0}
			>
				<Container
					maxWidth={1}
					paddingY={{ xs: 2, md: 1 }}
					paddingX={{ xs: 1, md: 4 }}
				>
					<Topbar />
				</Container>
			</AppBar>
			<div id="back-to-top-anchor" />
			<main>
				<Container
					sx={{ position: "relative" }}
					bgcolor="alternate.main"
					maxWidth={{
						sm: 720,
						md: "100%",
					}} // Replace md with 1440px if it doesn't work
					width={1}
					paddingY={{ xs: 0 }}
					paddingX={{ xs: 0 }}
				>
					{isMounted ? children : <LinearProgressBar />}
				</Container>
			</main>
			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpRounded />
				</Fab>
			</ScrollTop>
			<Container paddingY={4}>
				<Footer />
			</Container>
		</Box>
	);
};

export default memo(Dashboard);
