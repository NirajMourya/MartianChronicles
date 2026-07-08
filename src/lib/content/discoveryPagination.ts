export interface DiscoverySearchParams {
	readonly page?: string | readonly string[];
}

export const resolvePageNumber = (
	searchParams: DiscoverySearchParams | undefined,
	pageCount: number,
): number => {
	const raw = searchParams?.page;
	const normalized = Array.isArray(raw) ? raw[0] : raw;
	const parsed = Number.parseInt(normalized ?? "1", 10);

	if (!Number.isFinite(parsed) || parsed < 1) {
		return 1;
	}

	return Math.min(parsed, Math.max(1, pageCount));
};

export const paginateCollection = <T>(
	items: readonly T[],
	page: number,
	pageSize: number,
): T[] => {
	const start = (Math.max(1, page) - 1) * pageSize;
	return items.slice(start, start + pageSize);
};

export const buildPaginatedHref = (basePath: string, page: number): string => {
	if (page <= 1) {
		return basePath;
	}

	return `${basePath}?page=${page}`;
};
