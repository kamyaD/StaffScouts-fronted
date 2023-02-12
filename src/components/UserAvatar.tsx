import {
	AccountCircleOutlined,
	AllOutTwoTone,
	Logout,
	MenuBookTwoTone,
	WorkTwoTone,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Chip,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Tooltip,
	useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
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
	const pathname = usePathname();

	const { username, image, role } = session?.user || {
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
			name: "Dashboard",
			icon: <AllOutTwoTone />,
			link: "/select-user",
			secondaryText: "View your space",
		},
		{
			name: "Profile",
			icon: <AccountCircleOutlined />,
			link: "/account",
			secondaryText: "All about you",
		},
	];

	const rolesViews = [
		{ name: "CANDIDATE", icon: <MenuBookTwoTone color="action" /> },
		{ name: "EMPLOYER", icon: <WorkTwoTone color="action" /> },
	];

	const roleSwitch = (role: string) => {
		switch (role) {
			case "CANDIDATE":
				return "/candidate/jobs";
			case "EMPLOYER":
				return "/employer/analytics";
			default:
				return "/candidate/jobs";
		}
	};

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
				{role === "CANDIDATE" && (
					<MenuItem
						key={fancyId()}
						sx={{
							borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							paddingY: 1,
						}}
					>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							spacing={2}
							width={1}
						>
							<Tooltip title="candidate">
								<Box
									component={Button}
									onClick={() => {
										push(roleSwitch("CANDIDATE"));
										// .then(() => setCurrentRoleBasedAccess(role.name));
									}}
									// variant="outlined"
									// bgcolor={alpha(theme.palette.primary.main, 0.1)}
									// color={theme.palette.primary.main}
									variant={
										pathname?.includes("/candidate/") ? "contained" : "outlined"
									}
									aria-label="CANDIDATE"
									sx={{
										borderRadius: 1,
										minWidth: "auto",
										// borderColor: alpha(theme.palette.divider, 0.2),
									}}
								>
									<MenuBookTwoTone color="action" />
								</Box>
							</Tooltip>

							<Tooltip title="employer">
								<Box
									component={Button}
									onClick={() => {
										push(roleSwitch("EMPLOYER"));
										// .then(() => setCurrentRoleBasedAccess(role.name));
									}}
									// variant="outlined"
									// bgcolor={alpha(theme.palette.primary.main, 0.1)}
									// color={theme.palette.primary.main}
									variant={
										pathname?.includes("/employer/") ? "contained" : "outlined"
									}
									aria-label="EMPLOYER"
									sx={{
										borderRadius: 1,
										minWidth: "auto",
										// borderColor: alpha(theme.palette.divider, 0.2),
									}}
								>
									<WorkTwoTone color="action" />
								</Box>
							</Tooltip>
							{/*{rolesViews.map((role) => (*/}
							{/*	<Tooltip key={role.name} title={role.name.toLowerCase()}>*/}
							{/*		<Box*/}
							{/*			component={Button}*/}
							{/*			onClick={() => {*/}
							{/*				push(roleSwitch(role.name))*/}
							{/*					// .then(() => setCurrentRoleBasedAccess(role.name));*/}
							{/*			}}*/}
							{/*			// variant="outlined"*/}
							{/*			// bgcolor={alpha(theme.palette.primary.main, 0.1)}*/}
							{/*			// color={theme.palette.primary.main}*/}
							{/*			variant={*/}
							{/*				pathname?.includes(`/candidate/`)*/}
							{/*					? 'contained'*/}
							{/*					: 'outlined'*/}
							{/*			}*/}
							{/*			aria-label={role.name}*/}
							{/*			sx={{*/}
							{/*				borderRadius: 1,*/}
							{/*				minWidth: 'auto',*/}
							{/*				// borderColor: alpha(theme.palette.divider, 0.2),*/}
							{/*			}}*/}
							{/*		>*/}
							{/*			{role.icon}*/}
							{/*		</Box>*/}
							{/*	</Tooltip>*/}
							{/*))}*/}
						</Stack>
					</MenuItem>
				)}
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
