"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { footerConfig, navigationConfig, siteMetadata, socialLinks } from "@/config";

import { Logo } from "@/components/shared";
import { Container, Divider, Stack } from "@/components/ui";

import { FooterLinks } from "./FooterLinks";
import { FooterSocial } from "./FooterSocial";

/**
 * Persistent global footer shell rendered from configuration.
 */
export function Footer() {
	const navigationSections = navigationConfig.footer.filter((section) =>
		section.links.some((link) => !link.external),
	);

	return (
		<Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", mt: "auto" }}>
			<Container sx={{ py: { xs: 6, md: 8 } }}>
				<Stack spacing={4}>
					<Stack spacing={1.5}>
						<Logo variant="horizontal" size="sm" />
						<Typography variant="body2" color="text.secondary" sx={{ maxWidth: 560 }}>
							{footerConfig.description}
						</Typography>
					</Stack>
					<FooterLinks sections={navigationSections} />
					<FooterSocial links={socialLinks.footer} />
					<Divider />
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={1}
						justifyContent="space-between"
					>
						<Typography variant="caption" color="text.secondary">
							{siteMetadata.copyright}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							Built with {footerConfig.builtWith.join(", ")}
						</Typography>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
