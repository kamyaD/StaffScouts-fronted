import fancyId from "@/utils/fancyId";
import { Inbox, Mail } from "@mui/icons-material";
import {
	Box,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useSession } from "next-auth/react";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarClose: () => void;
	pages: Array<{
		title: string;
		href: string;
	}>;
}

const SidebarNav = ({ pages, onSidebarClose }: Props): JSX.Element => {
	const { data: session } = { ...useSession() };

	return (
		<Box display={"flex"} flexDirection={"column"} height={1}>
			{pages.map((item, index) => (
				<Box paddingY={1} key={fancyId()}>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <Inbox /> : <Mail />}
							</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				</Box>
			))}
			<Box sx={{ flexGrow: 1 }} />
		</Box>
	);
};

export default SidebarNav;
