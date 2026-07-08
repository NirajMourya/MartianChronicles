"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { SearchBar } from "./SearchBar";

export interface SearchDialogProps {
	readonly open: boolean;
	readonly onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="md"
			fullScreen={fullScreen}
			aria-labelledby="global-search-title"
		>
			<DialogTitle id="global-search-title">Search</DialogTitle>
			<DialogContent dividers>
				<SearchBar autoFocus onRequestClose={onClose} />
			</DialogContent>
		</Dialog>
	);
}
