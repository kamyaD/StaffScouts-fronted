import type { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import type { MouseEvent, ReactNode } from "react";

export interface MenuItemData {
	uid?: string;
	label?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	callback?: (event: MouseEvent<HTMLElement>, item: MenuItemData) => void;
	items?: MenuItemData[];
	disabled?: boolean;
	sx?: SxProps;
}
