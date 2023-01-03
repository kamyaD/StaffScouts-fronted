import { MenuTab, MenuTabs } from "@/components/MenuTabs";
import { AllOutTwoTone, SecurityTwoTone } from "@mui/icons-material";
import { Box, Card, Grid, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import type { ChangeEvent, ReactNode } from "react";
import { createElement, useEffect, useState } from "react";

import Container from "../../components/Container";
import TabPanel from "../../components/TabPanel";
import { General, Security } from "./components";

export interface MenuComponentProps {
	primaryText: string;
	component: any;
	icon: ReactNode;
	id: string;
}

const subPages: MenuComponentProps[] = [
	{
		id: "general",
		primaryText: "General",
		component: General,
		icon: <AllOutTwoTone />,
	},
	{
		id: "security",
		primaryText: "Security",
		component: Security,
		icon: <SecurityTwoTone />,
	},
];

function AccountSettingsView(): JSX.Element {
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
		+JSON.parse(
			typeof window !== "undefined"
				? (window.localStorage.getItem("selectedTabIndex") as string)
				: "0",
		),
	);

	useEffect(() => {
		window.localStorage.setItem(
			"selectedTabIndex",
			JSON.stringify(selectedTabIndex),
		);
	}, [selectedTabIndex]);

	const history = useRouter();

	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
		defaultMatches: true,
	});

	const handleOnChange = (
		event: ChangeEvent<HTMLDivElement>,
		value: number,
	) => {
		setSelectedTabIndex(value);
	};

	const a11yProps = (index: number | string) => ({
		id: `menu-tab-${index}`,
		"aria-controls": `menu-tabpanel-${index}`,
	});

	return (
		<Box sx={{ overflowX: "hidden" }}>
			<Box bgcolor="primary.main" paddingY={4}>
				<Container>
					<Typography variant="h4" fontWeight={700} gutterBottom>
						Account settings
					</Typography>
					<Typography variant="h6">
						Change account information and settings
					</Typography>
				</Container>
			</Box>

			<Container paddingTop="0 !important" marginTop={-8}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={2}>
						<Card
							sx={{
								boxShadow: 0,
								borderRadius: 3,
								border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							}}
						>
							<MenuTabs
								value={selectedTabIndex}
								// @ts-expect-error ignore error now
								onChange={handleOnChange}
								orientation={isSm ? "vertical" : "horizontal"}
								scrollButtons={false}
								textColor="secondary"
								aria-label="menu tabs"
							>
								{subPages.map((item) => (
									<MenuTab
										key={item.primaryText}
										label={item.primaryText}
										icon={item.icon}
										{...a11yProps(selectedTabIndex)}
									/>
								))}
							</MenuTabs>
						</Card>
					</Grid>
					<Grid item xs={12} md={10}>
						<Card
							sx={{
								boxShadow: 0,
								padding: 4,
								borderRadius: 3,
								border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							}}
						>
							<TabPanel value={selectedTabIndex} index={selectedTabIndex}>
								{createElement(subPages[selectedTabIndex]?.component, {
									history,
								})}
							</TabPanel>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default AccountSettingsView;
