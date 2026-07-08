"use client";

import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

export interface ReadingProgressProps {
	readonly targetSelector?: string;
}

/**
 * Thin scroll-progress indicator pinned to the article viewport.
 */
export function ReadingProgress({ targetSelector = "[data-reading-progress]" }: ReadingProgressProps) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			const target = document.querySelector(targetSelector) as HTMLElement | null;
			const documentHeight = target?.scrollHeight ?? document.documentElement.scrollHeight;
			const viewportHeight = window.innerHeight;
			const maxScroll = Math.max(documentHeight - viewportHeight, 1);
			setProgress(Math.min(window.scrollY / maxScroll, 1) * 100);
		};

		const onScroll = () => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [targetSelector]);

	return (
		<LinearProgress
			variant="determinate"
			value={progress}
			sx={(theme) => ({
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				height: 3,
				zIndex: theme.zIndex.appBar + 2,
				borderRadius: 0,
				backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(10,16,28,0.08)",
				"& .MuiLinearProgress-bar": {
					backgroundImage:
						theme.palette.mode === "dark"
							? "linear-gradient(90deg, #ff8a5b, #ff5a1f)"
							: "linear-gradient(90deg, #c84b1c, #ff6a3d)",
				},
			})}
			aria-label="Reading progress"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(progress)}
		/>
	);
}