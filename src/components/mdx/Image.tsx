import Box from "@mui/material/Box";

export interface MdxImageProps {
	readonly src: string;
	readonly alt: string;
	readonly title?: string;
	readonly zoomPlaceholder?: boolean;
}

/**
 * Responsive MDX image.
 *
 * Keep this renderer to a single <img> element so markdown images that are
 * wrapped by <p> remain valid HTML (a <figure> cannot be nested inside <p>).
 */
export function Image({ src, alt, title, zoomPlaceholder }: MdxImageProps) {
	return (
		<Box
			component="img"
			src={src}
			alt={alt}
			title={title}
			loading="lazy"
			decoding="async"
			sx={{
				display: "block",
				maxWidth: "100%",
				height: "auto",
				borderRadius: 3,
				border: "1px solid",
				borderColor: "divider",
				boxShadow: 1,
				cursor: zoomPlaceholder ? "zoom-in" : "default",
				my: 3,
			}}
		/>
	);
}
