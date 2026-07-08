import { Box, Container, Skeleton, Stack } from "@mui/material";

export default function RootLoading() {
	return (
		<Container maxWidth="lg" component="main" sx={{ py: { xs: 6, md: 8 } }}>
			<Stack spacing={3}>
				<Skeleton variant="text" width="40%" height={48} />
				<Skeleton variant="text" width="65%" height={28} />
				<Box sx={{ display: "grid", gap: 2.5 }}>
					<Skeleton variant="rounded" height={112} />
					<Skeleton variant="rounded" height={112} />
					<Skeleton variant="rounded" height={112} />
				</Box>
			</Stack>
		</Container>
	);
}
