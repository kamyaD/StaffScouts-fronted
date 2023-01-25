import { Drawer, Toolbar } from "@mui/material";

import { SidebarNav } from "./components";

export const drawerWidth = 240;

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarClose: () => void;
	open: boolean;
	variant: "permanent" | "persistent" | "temporary" | undefined;
	pages: Array<{
		title: string;
		href: string;
	}>;
}

const Sidebar = ({
	open,
	variant,
	onSidebarClose,
	pages,
}: Props): JSX.Element => {
	return (
		<Drawer
			anchor="left"
			onClose={onSidebarClose}
			open={open}
			variant={variant}
			sx={{
				"& .MuiPaper-root": {
					width: "100%",
					maxWidth: drawerWidth,
					height: { xs: "100%" },
					marginTop: 4,
					paddingRight: 2,
				},
			}}
			PaperProps={{
				sx: {
					borderRight: "none",
				},
			}}
		>
			<Toolbar variant={"dense"} />
			<SidebarNav pages={pages} onSidebarClose={onSidebarClose} />
		</Drawer>
	);
};

export default Sidebar;
