import { Tab, Tabs } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

interface MenuTabProps {
	label?: string;
	icon?: any;
}

const MenuTabs = styled(Tabs)({
	"& .MuiTabs-indicator": {
		display: "none",
	},
});

const MenuTab = styled((props: MenuTabProps) => (
	<Tab disableRipple {...props} />
))(({ theme }) => ({
	paddingBottom: 28,
	paddingTop: 28,
	textTransform: "none",
	color: theme.palette.text.primary,
	minWidth: 72,
	"&:hover": {
		color: theme.palette.text.primary,
		backgroundColor: alpha(theme.palette.primary.main, 0.1),
	},
	"&.Mui-selected": {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightMedium,
		border: "none",
		backgroundColor: alpha(theme.palette.primary.main, 0.2),
		// borderRadius: theme.shape.borderRadius,
	},
	"&:focus": {
		color: theme.palette.text.primary,
	},
}));

export { MenuTabs, MenuTab };
