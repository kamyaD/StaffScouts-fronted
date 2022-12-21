import { Box } from "@mui/material";

export interface TabPanelProps {
	children: JSX.Element;
	value: string | string[] | number | null;
	index: string | string[] | number | null;
}

function TabPanel({
	children,
	value,
	index,
	...other
}: TabPanelProps): JSX.Element {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`menu-tabpanel-${index}`}
			aria-labelledby={`menu-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					sx={{
						padding: 0,
						margin: 0,
					}}
					p={3}
					{...other}
					className="tab-panel"
					data-testid="tab-panel"
				>
					{children}
				</Box>
			)}
		</div>
	);
}

export default TabPanel;
