// components
import { Menu } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../../components/Logo";
import fancyId from "../../../../utils/fancyId";
import { mainLayoutNavigation } from "../../../navigation";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
}

const Topbar = ({ onSidebarOpen }: Props): JSX.Element => {
	const [activeLink, setActiveLink] = useState("");
	// const { pathname } = useRouter();
	//
	// useEffect(() => {
	// 	setActiveLink(window && window.location ? pathname : "");
	//
	// 	if (pathname === "/") {
	// 		setActiveLink("");
	// 	}
	// }, [pathname]);

	const renderAuthButtons = () => (
		<Box sx={{ display: { xs: "none", md: "flex" } }}>
			<Button component={Link} to="/login" variant="text" color="inherit">
				Login
			</Button>
			<Button
				component={Link}
				to="/register"
				variant="contained"
				color="primary"
				sx={{
					marginLeft: 2,
					paddingY: 0.5,
				}}
			>
				Sign up
			</Button>
		</Box>
	);

	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}
			alignItems={"center"}
			width={1}
		>
			<Box sx={{ display: { xs: "flex" } }} alignItems={"center"}>
				<Logo />
			</Box>
			<Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
				{mainLayoutNavigation.map((page, index) => (
					<Box key={fancyId()} marginLeft={index === 0 ? 0 : 4}>
						<Link to={page.href}>
							<Typography
								color="primary"
								sx={{
									color:
										activeLink === page.href
											? "primary.main"
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

			<Box sx={{ display: "flex" }} alignItems={"center"}>
				{renderAuthButtons()}
				<Box sx={{ display: { xs: "flex", md: "none" } }} alignItems={"center"}>
					<IconButton
						onClick={onSidebarOpen}
						aria-label="Menu"
						sx={{ padding: 0, margin: 0 }}
					>
						<Menu fontSize={"medium"} />
					</IconButton>
				</Box>
			</Box>
		</Box>
	);
};

export default Topbar;
