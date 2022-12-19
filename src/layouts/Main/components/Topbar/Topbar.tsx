// components
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../../svg/Logo";
import fancyId from "../../../../utils/fancyId";
import { mainLayoutNavigation } from "../../../navigation";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
	handleContactModal: () => void;
	colorInvert?: boolean;
}

const Topbar = ({
	onSidebarOpen,
	handleContactModal,
	colorInvert = false,
}: Props): JSX.Element => {
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
