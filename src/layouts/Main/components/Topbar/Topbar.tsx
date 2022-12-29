// components
import { Menu } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../../../components/Logo";
import UserAvatar from "../../../../components/UserAvatar";
import fancyId from "../../../../utils/fancyId";
import { mainLayoutNavigation } from "../../../navigation";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
}

function Topbar({ onSidebarOpen }: Props): JSX.Element {
	const isAuthenticated = useIsAuthenticated();
	const [activeLink, setActiveLink] = useState("");
	const { pathname } = useLocation();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : "");

		if (pathname === "/") {
			setActiveLink("");
		}
	}, [pathname]);

	const renderAuthButtons = () =>
		isAuthenticated() ? (
			<UserAvatar />
		) : (
			<Box sx={{ display: { xs: "none", md: "flex" } }}>
				<Button
					component={Link}
					to="/login"
					variant="text"
					color="inherit"
					sx={{
						color:
							activeLink === "/login" ? "secondary.main" : "text.secondary",
						cursor: "pointer",
						"&:hover": {
							color: "text.primary",
						},
					}}
				>
					Login
				</Button>
				<Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
				<Button
					component={Link}
					to="/register"
					variant="text"
					color="inherit"
					sx={{
						marginLeft: 2,
						paddingY: 0.5,
						color:
							activeLink === "/register" ? "secondary.main" : "text.secondary",
						cursor: "pointer",
						"&:hover": {
							color: "text.primary",
						},
					}}
				>
					Sign up
				</Button>
			</Box>
		);

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
						<Link to={page.href}>
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
				{renderAuthButtons()}
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
