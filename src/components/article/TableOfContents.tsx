"use client";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import type { HeadingOutlineItem } from "@/lib/content/extractHeadings";

import { Button, Stack, Surface } from "@/components/ui";

export interface TableOfContentsProps {
	readonly headings: readonly HeadingOutlineItem[];
	readonly mode?: "desktop" | "mobile";
}

const depthIndent: Readonly<Record<HeadingOutlineItem["depth"], number>> = {
	2: 0,
	3: 1,
	4: 2,
	5: 3,
	6: 4,
};

function useActiveHeading(headings: readonly HeadingOutlineItem[]) {
	const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

	useEffect(() => {
		if (headings.length === 0) {
			setActiveId("");
			return;
		}

		const elements = headings
			.map((heading) => document.getElementById(heading.id))
			.filter((element): element is HTMLElement => Boolean(element));

		if (elements.length === 0) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible[0]?.target instanceof HTMLElement) {
					setActiveId(visible[0].target.id);
				}
			},
			{ rootMargin: "-22% 0px -65% 0px", threshold: [0, 1] },
		);

		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, [headings]);

	return activeId;
}

function TocList({ headings, activeId }: { readonly headings: readonly HeadingOutlineItem[]; readonly activeId: string }) {
	return (
		<Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 0, listStyle: "none" }}>
			{headings.map((heading) => {
				const isActive = heading.id === activeId;
				return (
					<Box key={heading.id} component="li" sx={{ pl: depthIndent[heading.depth] * 1.25 }}>
						<Button
							component="a"
							href={`#${heading.id}`}
							variant="text"
							size="small"
							aria-current={isActive ? "location" : undefined}
							sx={{
								justifyContent: "flex-start",
								textTransform: "none",
								fontWeight: isActive ? 700 : 500,
								color: isActive ? "primary.main" : "text.secondary",
								minHeight: 0,
								py: 0.5,
								px: 1,
								borderRadius: 2,
								backgroundColor: isActive ? "action.hover" : "transparent",
								"&:hover": { backgroundColor: "action.hover" },
							}}
						>
							{heading.text}
						</Button>
					</Box>
				);
			})}
		</Stack>
	);
}

/**
 * Responsive article table of contents with scroll spy and mobile collapse.
 */
export function TableOfContents({ headings, mode = "desktop" }: TableOfContentsProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeId = useActiveHeading(headings);
	const hasHeadings = headings.length > 0;

	if (!hasHeadings) {
		return null;
	}

	return (
		<Surface
			component="nav"
			aria-label="Table of contents"
			sx={{
				p: 2.5,
				position: mode === "desktop" ? { md: "sticky" } : "relative",
				top: mode === "desktop" ? { md: 96 } : undefined,
			}}
		>
			<Stack spacing={1.5}>
				{mode === "mobile" ? (
					<>
						<Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", justifyContent: "space-between" }}>
							<Box>
								<Typography variant="overline" color="text.secondary">
									On this page
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{headings.length} section{headings.length === 1 ? "" : "s"}
								</Typography>
							</Box>
							<Button
								variant="outlined"
								size="small"
								onClick={() => setMobileOpen((value) => !value)}
								aria-expanded={mobileOpen}
								aria-controls="article-toc-mobile"
							>
								{mobileOpen ? "Hide contents" : "Show contents"}
							</Button>
						</Box>
						<Collapse in={mobileOpen} timeout="auto" unmountOnExit>
							<Box id="article-toc-mobile" sx={{ display: { xs: "block", md: "none" } }}>
								<Divider sx={{ mb: 1.5 }} />
								<TocList headings={headings} activeId={activeId} />
							</Box>
						</Collapse>
					</>
				) : (
					<Box sx={{ display: { xs: "none", md: "block" } }}>
						<Typography variant="overline" color="text.secondary">
							On this page
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
							{headings.length} section{headings.length === 1 ? "" : "s"}
						</Typography>
						<Divider sx={{ mb: 1.5 }} />
						<TocList headings={headings} activeId={activeId} />
					</Box>
				)}
			</Stack>
		</Surface>
	);
}