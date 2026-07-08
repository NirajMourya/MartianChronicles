"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type { KeyboardEvent } from "react";

export interface SearchInputProps {
	readonly value: string;
	readonly placeholder?: string;
	readonly autoFocus?: boolean;
	readonly onChange: (nextValue: string) => void;
	readonly onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, placeholder, autoFocus, onChange, onKeyDown }: SearchInputProps) {
	return (
		<TextField
			fullWidth
			autoFocus={autoFocus}
			placeholder={placeholder ?? "Search articles, tags, topics, categories..."}
			value={value}
			onChange={(event) => onChange(event.target.value)}
			onKeyDown={onKeyDown}
			inputProps={{
				"aria-label": "Search content",
				autoComplete: "off",
				spellCheck: false,
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchRounded fontSize="small" color="action" />
					</InputAdornment>
				),
			}}
		/>
	);
}
