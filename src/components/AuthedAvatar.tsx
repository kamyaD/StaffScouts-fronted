import UserAvatar from "@/components/UserAvatar";
import { Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AuthedAvatar = () => {
	const [activeLink, setActiveLink] = useState("");
	const { pathname } = useRouter();
	const { status } = useSession();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : "");

		if (pathname === "/") {
			setActiveLink("");
		}
	}, [pathname]);

	return status === "authenticated" ? (
		<UserAvatar />
	) : (
		<Box sx={{ display: { xs: "none", md: "flex" } }}>
			<Button
				component={Link}
				href="/login"
				variant="text"
				color="inherit"
				sx={{
					color: activeLink === "/login" ? "secondary.main" : "text.secondary",
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
				href="/register"
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
};

export default AuthedAvatar;
