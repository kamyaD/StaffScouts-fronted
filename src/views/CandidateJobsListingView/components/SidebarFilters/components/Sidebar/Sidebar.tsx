import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import React from "react";

import { FilterCategory, FilterSpecialism } from "./components";
import { useTheme } from "@mui/material/styles";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	open: boolean;
	variant: "permanent" | "persistent" | "temporary" | undefined;
	specialisms: any;
}

const Sidebar = ({
	open,
	variant,
	onClose,
	specialisms,
}: Props): JSX.Element => {
	const theme = useTheme();
	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			variant={variant}
			sx={{
				"& .MuiPaper-root": {
					position: "sticky",
					width: "100%",
					maxWidth: { xs: 300, md: 260 },
					minWidth: { xs: 300, md: 260 },
					border: 0,
					zIndex: 1100,
					// position: "sticky",
					top: theme.spacing(10),
					border: `1px solid ${theme.palette.divider}`,
					borderRadius: 2,
				},
			}}
		>
			<Box padding={2}>
				<FilterSpecialism specialisms={specialisms} />
				<Divider sx={{ my: 3 }} />
				<FilterCategory />
				<Divider sx={{ my: 3 }} />
				{/*<FilterGender />*/}
				{/*<Divider sx={{ my: 3 }} />*/}
				{/*<FilterBrand />*/}
				{/*<Divider sx={{ my: 3 }} />*/}
				{/*<FilterSize />*/}
				{/*<Divider sx={{ my: 3 }} />*/}
				{/*<FilterColor />*/}
				<Button variant={"contained"} size={"large"} fullWidth sx={{ mt: 3 }}>
					Reset all
				</Button>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
