import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import {
	Avatar,
	Chip,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
	useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import { useState } from "react";

import fancyId from "../utils/fancyId";

function UserAvatar(): JSX.Element {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { data: session } = useSession();
	const { push } = useRouter();

	const { username, image } = session?.user || {
		name: "Anonymous User",
		image: "/img/avatar.svg",
	};

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const logoutActiveUser = async (): Promise<void> => {
		await signOut({
			callbackUrl: `${window.location.origin}`,
		});
	};

	const open = Boolean(anchorEl);

	const menuItems = [
		{
			name: "Profile",
			icon: <AccountCircleOutlined />,
			link: "account",
			secondaryText: "All about you",
		},
	];

	return (
		<>
			<Tooltip title={username}>
				{isSm ? (
					<Avatar
						onClick={handleToggleProfileMenu}
						alt={username ?? "Anonymous User"}
						src={image ?? "/img/avatar.svg"}
						aria-describedby="menu-popover"
						aria-controls="menu-popover"
						aria-haspopup="true"
						typeof="button"
					/>
				) : (
					<Chip
						label={username ?? "Anonymous User"}
						variant="outlined"
						color="default"
						onClick={handleToggleProfileMenu}
						avatar={
							<Avatar
								alt={username ?? "Anonymous User"}
								src={image ?? "/img/avatar.svg"}
								aria-describedby="menu-popover"
								aria-controls="menu-popover"
								aria-haspopup="true"
								typeof="button"
								referrer-policy="no-referrer"
							/>
						}
					/>
				)}
			</Tooltip>
			<Menu
				id="menu-popover"
				anchorEl={anchorEl}
				open={open}
				onClose={handleProfileClose}
				onClick={handleProfileClose}
				PaperProps={{
					elevation: 0,
					sx: {
						border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						width: 270,
						maxWidth: "100%",
						zIndex: theme.zIndex.appBar + 1,
						overflow: "visible",
						// filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{menuItems.map((item) => {
					const handleClick = async () => {
						handleProfileClose();
						await push(item.link);
					};
					return (
						<MenuItem
							key={fancyId()}
							onClick={handleClick}
							sx={{
								borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
								paddingY: 1,
							}}
						>
							<ListItemIcon sx={{ minWidth: 44, marginRight: 1 }}>
								<Avatar
									sx={{
										backgroundColor: alpha(theme.palette.primary.main, 0.5),
										color: theme.palette.text.primary,
									}}
								>
									{item.icon}
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary={item.name}
								secondary={item.secondaryText}
							/>
						</MenuItem>
					);
				})}

				<MenuItem
					onClick={logoutActiveUser}
					sx={{
						paddingY: 1,
					}}
				>
					<ListItemIcon sx={{ minWidth: 44, marginRight: 1 }}>
						<Avatar
							sx={{
								backgroundColor: alpha(theme.palette.primary.main, 0.5),
								color: theme.palette.text.primary,
							}}
						>
							<Logout fontSize="small" />
						</Avatar>
					</ListItemIcon>
					<ListItemText primary="Logout" secondary="Heading back home" />
				</MenuItem>
			</Menu>
		</>
	);
}

export default UserAvatar;
