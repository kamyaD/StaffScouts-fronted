import AuthedAvatar from "@/components/AuthedAvatar";
// components
import { ArrowBackRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const Topbar = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}
			alignItems={"center"}
		>
			<Box
				sx={{ display: "flex" }}
				alignItems={"center"}
				onClick={() =>
					router.push(router.pathname === "/account" ? "/dashboard" : "/")
				}
			>
				<IconButton style={{ marginRight: theme.spacing(1) }} color="inherit">
					<ArrowBackRounded className="learn-more-link__arrow" />
				</IconButton>
				<Typography
					fontWeight={600}
					variant="body1"
					color="inherit"
					sx={{ cursor: "pointer" }}
				>
					{router.pathname === "/account" ? "back" : "home"}
				</Typography>
			</Box>

			<AuthedAvatar />
		</Box>
	);
};

export default Topbar;
