import { IconMenuItem, NestedMenuItem } from "@/components/NestedMenu";
import type { MenuItemData } from "@/components/NestedMenu/definitions";
import type { MouseEvent } from "react";

export interface NestedMenuItemsFromObjectProps {
	menuItemsData: MenuItemData[];
	isOpen: boolean;
	handleClose: () => void;
}

/**
 * Create a JSX element with nested elements creating a nested menu.
 * Every menu item should have a uid provided
 */
export function NestedMenuItemsFromObject({
	menuItemsData: items,
	isOpen,
	handleClose,
}: NestedMenuItemsFromObjectProps) {
	return items.map((item) => {
		const { leftIcon, rightIcon, label, items, callback, sx, disabled } = item;

		if (items && items.length > 0) {
			// Recurse deeper
			return (
				<NestedMenuItem
					key={label}
					leftIcon={leftIcon}
					rightIcon={rightIcon}
					label={label}
					parentMenuOpen={isOpen}
					sx={sx}
					disabled={disabled}
				>
					{/* Call this function to nest more items */}
					{NestedMenuItemsFromObject({
						handleClose,
						isOpen,
						menuItemsData: items,
					})}
				</NestedMenuItem>
			);
		} else {
			// No children elements, return MenuItem
			return (
				<IconMenuItem
					key={label}
					leftIcon={leftIcon}
					rightIcon={rightIcon}
					label={label}
					onClick={(event: MouseEvent<HTMLElement>) => {
						handleClose();
						callback && callback(event, item);
					}}
					sx={sx}
					disabled={disabled}
				/>
			);
		}
	});
}
