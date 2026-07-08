"use client";

import Alert from "@mui/material/Alert";
import { useMemo, useState } from "react";

import { Button, Stack } from "@/components/ui";

export interface ShareActionsProps {
	readonly title: string;
	readonly url: string;
}

/**
 * Reusable article share actions with clipboard fallback.
 */
export function ShareActions({ title, url }: ShareActionsProps) {
	const [copied, setCopied] = useState(false);
	const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);
	const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);

	const copyLink = async () => {
		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(url);
			} else {
				const textarea = document.createElement("textarea");
				textarea.value = url;
				textarea.setAttribute("readonly", "true");
				textarea.style.position = "absolute";
				textarea.style.left = "-9999px";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			window.prompt("Copy this link", url);
		}
	};

	return (
		<Stack spacing={1.5}>
			<Stack direction="row" spacing={1} flexWrap="wrap">
				<Button variant="outlined" size="small" onClick={copyLink}>
					{copied ? "Copied" : "Copy Link"}
				</Button>
				<Button component="a" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" variant="outlined" size="small">
					LinkedIn
				</Button>
				<Button component="a" href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" variant="outlined" size="small">
					X
				</Button>
				<Button variant="outlined" size="small" disabled>
					Dev.to
				</Button>
			</Stack>
			{copied ? <Alert severity="success">Article link copied to clipboard.</Alert> : null}
		</Stack>
	);
}