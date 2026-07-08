import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Button, Stack } from "@/components/ui";

export interface GitHubProps {
	readonly repo: string;
	readonly issue?: number;
	readonly pr?: number;
}

/**
 * GitHub link block for repository references in MDX.
 */
export function GitHub({ repo, issue, pr }: GitHubProps) {
	const issuePath = typeof issue === "number" ? `/issues/${issue}` : "";
	const prPath = typeof pr === "number" ? `/pull/${pr}` : "";
	const href = `https://github.com/${repo}${issuePath || prPath}`;

	return (
		<Box sx={{ my: 3, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
			<Stack spacing={1.25}>
				<Typography variant="subtitle2" color="text.secondary">
					GitHub Reference
				</Typography>
				<Typography variant="body2">{repo}</Typography>
				<Button component="a" href={href} target="_blank" rel="noopener noreferrer" size="small">
					Open on GitHub
				</Button>
			</Stack>
		</Box>
	);
}
