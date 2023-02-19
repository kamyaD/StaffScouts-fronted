import { ChevronDown } from "@/components/Icons";
import type { MenuItemData } from "@/components/NestedMenu/definitions";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import type { MenuProps } from "@mui/material/Menu";
import Menu from "@mui/material/Menu";
import type { MouseEvent, ReactNode } from "react";
import { forwardRef, useState } from "react";

import { NestedMenuItemsFromObject } from "./nestedMenuItemsFromObject";

interface NestedDropdownProps {
	children?: ReactNode;
	menuItemsData?: MenuItemData;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	ButtonProps?: Partial<ButtonProps>;
	MenuProps?: Partial<MenuProps>;
}

export const NestedDropdown = forwardRef<
	HTMLDivElement | null,
	NestedDropdownProps
>(function NestedDropdown(props, ref) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	const {
		menuItemsData: data,
		onClick,
		ButtonProps,
		MenuProps,
		...rest
	} = props;

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
		onClick && onClick(e);
	};
	const handleClose = () => setAnchorEl(null);

	const menuItems = NestedMenuItemsFromObject({
		handleClose,
		isOpen: open,
		menuItemsData: data?.items ?? [],
	});

	return (
		<div ref={ref} {...rest}>
			<Button onClick={handleClick} endIcon={<ChevronDown />} {...ButtonProps}>
				{data?.label ?? "Menu"}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				{...MenuProps}
			>
				{menuItems}
			</Menu>
		</div>
	);
});
