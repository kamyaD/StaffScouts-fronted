import { PolicyTwoTone } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import packageJson from "../../../../../../../package.json";
import Container from "../../../../../../components/Container";
import Logo from "../../../../../../svg/Logo";
import NavItem from "./components/NavItem";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	handleContactModal: () => void;
}

const SidebarNav = ({ onClose, handleContactModal }: Props): JSX.Element => {
	const handleLogin = () => {};

	const logoutActiveUser = async (e: {
		preventDefault: () => void;
	}): Promise<void> => {
		e.preventDefault();
	};

	const renderAuthButtons = () => (
		<Box>
			<Button fullWidth variant="outlined" color="primary" size="medium">
				{"Account"}
			</Button>
		</Box>
	);

	const accountAvatar = () => {
		return (
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				spacing={2}
			>
				<Chip
					size="medium"
					label={"Anonymous User"}
					variant="outlined"
					color="primary"
					avatar={
						<Avatar
							alt={"Anonymous User"}
							src={
								"https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg"
							}
							aria-describedby="menu-popover"
							aria-controls="menu-popover"
							aria-haspopup="true"
							typeof="button"
						/>
					}
				/>
			</Stack>
		);
	};

	return (
		<Box>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				marginLeft={2}
			>
				{<Logo />}
				<Box display={"flex"} justifyContent={"flex-end"} onClick={onClose}>
					<IconButton>
						<CloseIcon fontSize="medium" />
					</IconButton>
				</Box>
			</Stack>
			<Box paddingX={2} paddingBottom={2}>
				<Box>
					<NavItem title={""} handleContactModal={handleContactModal} />
				</Box>
				<Divider sx={{ marginBottom: 2 }} />
				{renderAuthButtons()}
			</Box>
			<Container paddingY={2} sx={{ bottom: 0, position: "fixed" }}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
				>
					<Button
						component={Link}
						to="company-terms"
						startIcon={<PolicyTwoTone />}
						sx={{ color: "text.primary", paddingX: 0 }}
					>
						Legal
					</Button>
					<Typography variant={"caption"} fontWeight={300}>
						{`v${packageJson.version}`}
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default SidebarNav;
