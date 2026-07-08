"use client";

import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import { useState } from "react";

import { IconButton, Tooltip } from "@/components/ui";

export interface CopyCodeButtonProps {
	readonly code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
	const [copied, setCopied] = useState(false);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	};

	return (
		<Tooltip title={copied ? "Copied" : "Copy code"}>
			<IconButton
				size="small"
				aria-label={copied ? "Copied" : "Copy code"}
				onClick={onCopy}
			>
				{copied ? <DoneRounded fontSize="inherit" /> : <ContentCopyRounded fontSize="inherit" />}
			</IconButton>
		</Tooltip>
	);
}
