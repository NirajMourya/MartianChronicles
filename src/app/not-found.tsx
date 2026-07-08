import Link from "next/link";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Typography } from "@mui/material";

import { Button, Container, Stack } from "@/components/ui";

export default function NotFoundPage() {
	return (
		<Container maxWidth="md" component="main" sx={{ py: { xs: 8, md: 12 } }}>
			<Stack spacing={2.5}>
				<Typography variant="overline" color="text.secondary">
					404
				</Typography>
				<Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
					Page not found
				</Typography>
				<Typography variant="body1" color="text.secondary">
					The page you requested does not exist or has been moved.
				</Typography>
				<Stack direction="row" spacing={1.5}>
					<Button
						component={Link}
						href="/"
						variant="outlined"
						startIcon={<ArrowBackRoundedIcon fontSize="small" />}
					>
						Go home
					</Button>
					<Button
						component={Link}
						href="/search"
						variant="contained"
						startIcon={<SearchRoundedIcon fontSize="small" />}
					>
						Search content
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
}
