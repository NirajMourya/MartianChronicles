"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { IconButton, Tooltip } from "@/components/ui";

const LazySearchDialog = dynamic(
	() => import("./SearchDialog").then((module) => module.SearchDialog),
	{ ssr: false },
);

const shortcutLabel = "Ctrl/Cmd + K";

export interface SearchShortcutProps {
	readonly showTrigger?: boolean;
	readonly enableHotkey?: boolean;
}

export function SearchShortcut({ showTrigger = true, enableHotkey = true }: SearchShortcutProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!enableHotkey) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen(true);
			}
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [enableHotkey]);

	return (
		<>
			{showTrigger ? (
				<Tooltip title={`Search (${shortcutLabel})`}>
					<IconButton aria-label={`Open search dialog (${shortcutLabel})`} onClick={() => setOpen(true)}>
						<SearchRounded fontSize="small" />
					</IconButton>
				</Tooltip>
			) : null}
			{open ? <LazySearchDialog open={open} onClose={() => setOpen(false)} /> : null}
		</>
	);
}
