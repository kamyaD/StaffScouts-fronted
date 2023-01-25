import { Box, Skeleton } from "@mui/material";

export default function generateArray<T>(
	length: number,
	generator: () => T,
): T[] {
	return Array.from({ length }, generator);
}

export const skeletonRows = (numberOfRows = 1) => {
	return (
		<Box sx={{ flex: 1 }}>
			{[...Array(numberOfRows)].map((e, i) => (
				<Skeleton key={i} animation="wave" />
			))}
		</Box>
	);
};
