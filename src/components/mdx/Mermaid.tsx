"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useRef, useState } from "react";

export interface MermaidProps {
	readonly chart?: string;
}

/**
 * Mermaid placeholder block; future enhancement can render diagrams client-side.
 */
export function Mermaid({ chart }: MermaidProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
	const source = useMemo(
		() => chart ?? "graph TD; A[Input] --> B[Future Mermaid Rendering];",
		[chart],
	);

	useEffect(() => {
		let cancelled = false;

		const renderDiagram = async () => {
			try {
				const mermaid = await import("mermaid");
				mermaid.default.initialize({
					startOnLoad: false,
					securityLevel: "strict",
					theme: document.documentElement.dataset.muiColorScheme === "dark" ? "dark" : "default",
				});
				const { svg } = await mermaid.default.render(`mermaid-${Math.random().toString(36).slice(2)}`, source);
				if (!cancelled && containerRef.current) {
					containerRef.current.innerHTML = svg;
					setStatus("ready");
				}
			} catch {
				if (!cancelled) {
					setStatus("error");
				}
			}
		};

		renderDiagram();
		return () => {
			cancelled = true;
		};
	}, [source]);

	return (
		<Box
			ref={containerRef}
			sx={{
				my: 3,
				p: 2.5,
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 3,
				backgroundColor: "background.paper",
				minHeight: 140,
			}}
		>
			{status === "loading" ? (
				<Typography variant="body2" color="text.secondary">
					Rendering diagram...
				</Typography>
			) : null}
			{status === "error" ? (
				<Box component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", color: "text.secondary", fontSize: "0.875rem" }}>
					{source}
				</Box>
			) : null}
		</Box>
	);
}
