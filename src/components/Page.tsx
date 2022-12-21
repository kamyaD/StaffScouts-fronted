import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import AOS from "aos";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../store";
import getTheme from "../theme";
import SnackBar from "./SnackBar";

export const useDarkMode = (): [string, () => void, boolean] => {
	const [themeMode, setTheme] = useState("light");
	const [mountedComponent, setMountedComponent] = useState(false);

	const setMode = (mode: string) => {
		try {
			window.localStorage.setItem("themeMode", mode);
		} catch {
			/* do nothing */
		}

		setTheme(mode);
	};

	const themeToggler = (): void => {
		themeMode === "light" ? setMode("dark") : setMode("light");
	};

	useEffect(() => {
		try {
			const localTheme = window.localStorage.getItem("themeMode");
			localTheme ? setTheme(localTheme) : setMode("light");
		} catch {
			setMode("light");
		}

		setMountedComponent(true);
	}, []);

	return [themeMode, themeToggler, mountedComponent];
};

interface Props {
	children: ReactNode;
}

export default function Page({ children }: Props): JSX.Element {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			once: true,
			delay: 50,
			duration: 500,
			easing: "ease-in-out",
		});
	}, []);

	const [themeMode, themeToggler, mountedComponent] = useDarkMode();
	const snack = useSelector((store: RootState) => store.snack);

	useEffect(() => {
		AOS.refresh();
	}, [mountedComponent, themeMode]);

	return (
		<ThemeProvider theme={getTheme(themeMode, themeToggler)}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<Paper elevation={0}>{children}</Paper>
			<SnackBar snack={snack} />
		</ThemeProvider>
	);
}
