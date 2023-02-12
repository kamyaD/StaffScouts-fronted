import AuthedAvatar from "@/components/AuthedAvatar";
// components
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Logo from "../../../../components/Logo";
import fancyId from "../../../../utils/fancyId";
import { mainLayoutNavigation } from "../../../navigation";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
}

function Topbar({ onSidebarOpen }: Props): JSX.Element {
	const [activeLink, setActiveLink] = useState("");
	const { pathname } = useRouter();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : "");

		if (pathname === "/") {
			setActiveLink("");
		}
	}, [pathname]);

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width={1}
		>
			<Box sx={{ display: { xs: "flex" } }} alignItems="center">
				<Logo />
			</Box>
			<Box sx={{ display: { xs: "none", md: "flex" } }} alignItems="center">
				{mainLayoutNavigation.map((page, index) => (
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

			<Box sx={{ display: "flex" }} alignItems="center">
				<AuthedAvatar />
				<Box sx={{ display: { xs: "flex", md: "none" } }} alignItems="center">
					<IconButton
						onClick={onSidebarOpen}
						aria-label="Menu"
						sx={{ padding: 0, margin: 0 }}
					>
						<Menu fontSize="medium" />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
}

export default Topbar;
