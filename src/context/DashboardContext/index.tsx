import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { createContext, useState } from "react";

interface Props {
	children: ReactNode;
}

const DashboardContext = createContext({
	handleSidebar: () => {},
	isSidebarOpen: false,
});

const DashboardProvider = ({ children }: Props) => {
	const [openSidebar, setOpenSidebar] = useState<boolean>(false);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up("md"), {
		defaultMatches: true,
	});

	const handleSidebar = (): void => setOpenSidebar((prevState) => !prevState);

	return (
		<DashboardContext.Provider
			value={{
				handleSidebar,
				isSidebarOpen: isMd ? false : openSidebar,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};

export { DashboardContext, DashboardProvider };
