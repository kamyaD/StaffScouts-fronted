/* eslint-disable react/jsx-props-no-spreading */
import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	// All other props
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
}

function Container({ children, ...rest }: Props): JSX.Element {
	return (
		<Box
			maxWidth={{ sm: 720, md: 1236 }}
			width={1}
			margin="0 auto"
			paddingX={2}
			paddingY={{ xs: 4, sm: 6, md: 8 }}
			{...rest}
		>
			{children}
		</Box>
	);
}

export default Container;
