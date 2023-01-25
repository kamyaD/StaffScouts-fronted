import Logo from "@/components/Logo";
import Notifications from "@/components/Notifications";
import UserAvatar from "@/components/UserAvatar";
import { candidatesLayoutNavigation } from "@/layouts/navigation";
import fancyId from "@/utils/fancyId";
// components
import type { Theme } from "@mui/material";
import { Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Topbar = (): JSX.Element => {
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
	const theme = useTheme();
	const [activeLink, setActiveLink] = useState("");
	const { pathname } = useRouter();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : "");

		if (pathname === "/") {
			setActiveLink("");
		}
	}, [pathname]);

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

			<Box sx={{ display: { xs: "none", md: "flex" } }} alignItems="flex-start">
				{candidatesLayoutNavigation.map((page, index) => (
					<Box key={fancyId()} marginLeft={index === 0 ? 0 : 4}>
						<Link href={page.href}>
							<Typography
								color="primary"
								sx={{
									color:
										activeLink === page.href
											? "secondary.main"
											: "text.secondary",
									cursor: "pointer",
									"&:hover": {
										color: "text.primary",
									},
								}}
							>
								{page.title}
							</Typography>
						</Link>
					</Box>
				))}
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
