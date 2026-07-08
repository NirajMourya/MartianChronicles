"use client";

import { useEffect } from "react";

import Link from "next/link";

import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function RootError({
	error,
	reset,
}: {
	readonly error: Error & { digest?: string };
	readonly reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Container maxWidth="md" component="main" sx={{ py: { xs: 8, md: 12 } }}>
			<Stack spacing={2.5} alignItems="flex-start">
				<Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
					Something went wrong
				</Typography>
				<Typography variant="body1" color="text.secondary">
					An unexpected error occurred while rendering this page.
				</Typography>
				<Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
					<Button
						variant="contained"
						onClick={reset}
						startIcon={<RefreshRoundedIcon fontSize="small" />}
					>
						Try again
					</Button>
					<Button component={Link} href="/" variant="outlined">
						Back to home
					</Button>
				</Box>
			</Stack>
		</Container>
	);
}
