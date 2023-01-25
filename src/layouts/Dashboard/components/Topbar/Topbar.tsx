import Logo from "@/components/Logo";
import Notifications from "@/components/Notifications";
import UserAvatar from "@/components/UserAvatar";
// components
import type { Theme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const Topbar = (): JSX.Element => {
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const theme = useTheme();

	// :TODO: Add dark mode toggler
	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}
			alignItems={"center"}
		>
			<Box sx={{ display: isSm ? "flex" : "none" }} alignItems={"center"}>
				<Logo />
			</Box>

			{/*<SearchBox />*/}

			<Box sx={{ display: "flex" }} alignItems={"center"}>
				<Notifications />
				<Box marginLeft={3}>
					<UserAvatar />
				</Box>
			</Box>
		</Box>
	);
};

export default Topbar;
