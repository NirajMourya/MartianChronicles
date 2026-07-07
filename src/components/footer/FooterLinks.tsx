import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import type { FooterLinkSection } from "@/config/navigation";

export interface FooterLinksProps {
	readonly sections: readonly FooterLinkSection[];
}

/**
 * Footer link columns rendered from navigation configuration.
 */
export function FooterLinks({ sections }: FooterLinksProps) {
	return (
		<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 3 }}>
			{sections.map((section) => (
				<Box key={section.title}>
					<Typography variant="overline" color="text.secondary">
						{section.title}
					</Typography>
					<Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "grid", gap: 0.75 }}>
						{section.links.map((item) => (
							<Box component="li" key={`${section.title}-${item.href}`}>
								<Typography
									component={Link}
									href={item.href}
									variant="body2"
									color="text.secondary"
									target={item.external ? "_blank" : undefined}
									rel={item.external ? "noopener noreferrer" : undefined}
									sx={{ textDecoration: "none", "&:hover": { color: "text.primary" } }}
								>
									{item.label}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
}
