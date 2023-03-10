import { KeyboardArrowUpRounded } from "@mui/icons-material";
import { AppBar, Box, Fab, Zoom, useScrollTrigger } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { MouseEvent, ReactElement, ReactNode } from "react";
import { useState } from "react";

import Container from "../../components/Container";
import { Footer, Sidebar, Topbar } from "./components";

interface Props {
	children: ReactNode;
	colorInvert?: boolean;
	bgcolor?: string;
}

interface AppBarOnScrollProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
	window?: () => Window;
	isMobileView?: boolean;
}

interface ScrollTopProps {
	window?: () => Window;
	children: ReactElement;
}

export function ScrollTop({ window, children }: ScrollTopProps) {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector("#back-to-top-anchor");

		if (anchor) {
			anchor.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: "fixed", bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
}

function Main({ children }: Props): JSX.Element {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});
	const isSm = useMediaQuery(theme.breakpoints.down("sm"), {
		defaultMatches: true,
	});

	const [openSidebar, setOpenSidebar] = useState(false);
	const [openContactModal, setContactModalOpen] = useState<boolean>(false);

	const handleContactModal = () =>
		setContactModalOpen((prevState) => !prevState);

	const handleSidebarOpen = (): void => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = (): void => {
		setOpenSidebar(false);
	};

	const open = isMd ? false : openSidebar;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return (
		<Box position="relative" minHeight="100vh">
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
					<Topbar onSidebarOpen={handleSidebarOpen} />
				</Container>
			</AppBar>
			<div id="back-to-top-anchor" />
			<Sidebar
				onClose={handleSidebarClose}
				handleContactModal={handleContactModal}
				open={open}
				variant="temporary"
			/>
			<main>{children}</main>
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
}

export default Main;
