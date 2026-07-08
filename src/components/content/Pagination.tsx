"use client";

import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export interface PaginationProps {
	readonly page: number;
	readonly pageCount: number;
	readonly basePath: string;
	readonly label?: string;
}

const createHref = (basePath: string, pageNumber: number): string => {
	if (pageNumber <= 1) {
		return basePath;
	}

	return `${basePath}?page=${pageNumber}`;
};

export function Pagination({ page, pageCount, basePath, label = "Pagination" }: PaginationProps) {
	if (pageCount <= 1) {
		return null;
	}

	return (
		<MuiPagination
			page={page}
			count={pageCount}
			shape="rounded"
			color="primary"
			aria-label={label}
			variant="outlined"
			renderItem={(item) => (
				<PaginationItem
					{...item}
					component="a"
					href={item.page ? createHref(basePath, item.page) : undefined}
					slots={{ previous: ChevronLeftRounded, next: ChevronRightRounded }}
				/>
			)}
		/>
	);
}
