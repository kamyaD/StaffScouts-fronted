import type { Theme } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";
import type { ComponentsOverrides } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

import { dark, light } from "./palette";
import shadows from "./shadows";

const getTheme = (mode: string, themeToggler: () => void): Theme =>
	responsiveFontSizes(
		createTheme({
			palette: mode === "light" ? light : dark,
			shadows: shadows(mode),
			typography: {
				fontFamily: [`Google Sans`, `Helvetica`, `Arial`, `sans-serif`].join(
					",",
				),
				fontSize: 16,
				button: {
					textTransform: "none",
					fontWeight: "medium" as CSSProperties["fontWeight"],
				},
			},
			zIndex: {
				appBar: 1200,
				drawer: 1300,
			},
			components: {
				MuiButton: {
					styleOverrides: {
						root: {
							fontWeight: 400,
							borderRadius: 5,
							paddingTop: 10,
							paddingBottom: 10,
						},
						containedSecondary: mode === "light" ? { color: "white" } : {},
					} as ComponentsOverrides["MuiButton"],
				},
				MuiInputBase: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
					} as ComponentsOverrides["MuiInputBase"],
				},
				MuiOutlinedInput: {
					styleOverrides: {
						root: {
							borderRadius: 5,
						},
						input: {
							borderRadius: 5,
						},
					} as ComponentsOverrides["MuiOutlinedInput"],
				},
				MuiCard: {
					styleOverrides: {
						root: {
							borderRadius: 8,
						},
					} as ComponentsOverrides["MuiCard"],
				},
			},
			themeToggler,
		}),
	);

export default getTheme;
