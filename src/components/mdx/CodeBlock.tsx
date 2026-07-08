import "server-only";

import type { ReactElement, ReactNode } from "react";
import { cache, isValidElement } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { codeToHtml } from "shiki";

import { CopyCodeButton } from "./CopyCodeButton";

export interface CodeBlockProps {
	readonly children?: ReactNode;
	readonly className?: string;
	readonly metastring?: string;
}

interface ParsedCodeBlock {
	readonly code: string;
	readonly language: string;
	readonly meta?: string;
}

interface CodeLine {
	readonly html: string;
	readonly lineNumber: number;
	readonly highlighted: boolean;
}

const parseCodeFromChildren = (children?: ReactNode, className?: string, meta?: string): ParsedCodeBlock => {
	if (isValidElement(children)) {
		const element = children as ReactElement<{ className?: string; children?: ReactNode; metastring?: string }>;
		const languageFromClass = element.props.className?.replace("language-", "") || className?.replace("language-", "");
		const rawCode = typeof element.props.children === "string" ? element.props.children : String(element.props.children ?? "");
		return {
			code: rawCode.trimEnd(),
			language: languageFromClass || "text",
			meta: element.props.metastring ?? meta,
		};
	}

	const raw = typeof children === "string" ? children : String(children ?? "");
	return {
		code: raw.trimEnd(),
		language: className?.replace("language-", "") || "text",
		meta,
	};
};

const getHighlightedHtml = cache(async (code: string, language: string) => {
	return codeToHtml(code, {
		lang: language,
		themes: {
			light: "github-light",
			dark: "github-dark",
		},
	});
});

const resolveFileName = (meta?: string): string | null => {
	if (!meta) {
		return null;
	}
	const match = meta.match(/filename="([^"]+)"|filename=([^\s]+)/i);
	if (!match) {
		return null;
	}
	return match[1] ?? match[2] ?? null;
};

const resolveHighlightedLines = (meta?: string): Set<number> => {
	const highlighted = new Set<number>();
	if (!meta) {
		return highlighted;
	}

	const rangeMatch = meta.match(/(?:highlight|hl|lines?)=([0-9,-]+)/i) ?? meta.match(/\{([0-9,-]+)\}/);
	const value = rangeMatch?.[1];
	if (!value) {
		return highlighted;
	}

	for (const part of value.split(",")) {
		const [startValue, endValue] = part.split("-");
		const start = Number.parseInt(startValue, 10);
		const end = Number.parseInt(endValue ?? "", 10);

		if (Number.isFinite(start) && Number.isFinite(end)) {
			for (let line = start; line <= end; line += 1) {
				highlighted.add(line);
			}
			continue;
		}

		if (Number.isFinite(start)) {
			highlighted.add(start);
		}
	}

	return highlighted;
};

const parseHighlightedLines = (html: string, highlightedLines: Set<number>): CodeLine[] => {
	const lineMatches = Array.from(html.matchAll(/<span class="line">([\s\S]*?)<\/span>/g));
	return lineMatches.map((match, index) => ({
		html: match[1],
		lineNumber: index + 1,
		highlighted: highlightedLines.has(index + 1),
	}));
};

/**
 * MDX fenced code renderer with syntax highlighting and copy action.
 */
export async function CodeBlock({ children, className, metastring }: CodeBlockProps) {
	const parsed = parseCodeFromChildren(children, className, metastring);
	const fileName = resolveFileName(parsed.meta);
	const highlightedLines = resolveHighlightedLines(parsed.meta);
	const highlightedHtml = await getHighlightedHtml(parsed.code, parsed.language);
	const lines = parseHighlightedLines(highlightedHtml, highlightedLines);

	return (
		<Box sx={{ my: 3, border: "1px solid", borderColor: "divider", borderRadius: 3, overflow: "hidden" }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 1.25,
					py: 0.75,
					borderBottom: "1px solid",
					borderColor: "divider",
					backgroundColor: "action.hover",
				}}
			>
				<Typography variant="caption" color="text.secondary" component="span">
					{fileName ?? parsed.language.toUpperCase()}
				</Typography>
				<CopyCodeButton code={parsed.code} />
			</Box>
			<Box
				sx={{
					overflowX: "auto",
					backgroundColor: "background.default",
					"& pre": {
						margin: 0,
						padding: 0,
						background: "transparent",
					},
					"& code": {
						display: "block",
						minWidth: "100%",
						fontFamily:
							'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)',
						fontSize: "0.875rem",
						lineHeight: 1.8,
						backgroundColor: "transparent",
					},
					"& .code-line": {
						display: "grid",
						gridTemplateColumns: "3rem 1fr",
						columnGap: 16,
						paddingInline: 16,
						whiteSpace: "pre",
						alignItems: "start",
					},
					"& .code-line + .code-line": {
						borderTop: "1px solid",
						borderColor: "divider",
					},
					"& .code-line-number": {
						minWidth: 32,
						textAlign: "right",
						color: "text.disabled",
						userSelect: "none",
						paddingTop: 1,
					},
					"& .code-line[data-highlighted='true']": {
						backgroundColor: "action.hover",
					},
					"& .code-line[data-highlighted='true'] .code-line-number": {
						color: "primary.main",
						fontWeight: 700,
					},
					"& .code-line-content": {
						display: "block",
						minWidth: 0,
					},
				}}
			>
				<Box component="pre" sx={{ m: 0 }}>
					<Box component="code" aria-label={`${parsed.language.toUpperCase()} code`}>
						{lines.map((line) => (
							<Box
								key={line.lineNumber}
								component="span"
								className="code-line"
								data-highlighted={line.highlighted ? "true" : undefined}
							>
								<Box component="span" className="code-line-number" aria-hidden="true">
									{line.lineNumber}
								</Box>
								<Box component="span" className="code-line-content" dangerouslySetInnerHTML={{ __html: line.html || "&#8203;" }} />
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
