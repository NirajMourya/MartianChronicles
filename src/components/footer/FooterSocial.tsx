import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import type { SocialLink } from "@/config/social";

export interface FooterSocialProps {
	readonly links: readonly SocialLink[];
}

/**
 * Footer social links rendered from canonical social configuration.
 */
export function FooterSocial({ links }: FooterSocialProps) {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
			{links.map((link) => (
				<Typography
					key={link.platform}
					component={Link}
					href={link.href}
					variant="body2"
					color="text.secondary"
					target={link.external ? "_blank" : undefined}
					rel={link.external ? "noopener noreferrer" : undefined}
					sx={{ textDecoration: "none", "&:hover": { color: "text.primary" } }}
				>
					{link.label}
				</Typography>
			))}
		</Box>
	);
}
