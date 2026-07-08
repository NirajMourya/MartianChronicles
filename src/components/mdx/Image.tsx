import Box from "@mui/material/Box";

export interface MdxImageProps {
	readonly src: string;
	readonly alt: string;
	readonly title?: string;
	readonly zoomPlaceholder?: boolean;
}

/**
 * Responsive MDX image with semantic alt text support.
 */
export function Image({ src, alt, title, zoomPlaceholder }: MdxImageProps) {
	return (
		<Box component="figure" sx={{ my: 3, mx: 0, position: "relative" }}>
			<Box
				component="img"
				src={src}
				alt={alt}
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
				}}
			/>
			{zoomPlaceholder ? (
				<Box
					sx={{
						position: "absolute",
						top: 12,
						right: 12,
						px: 1,
						py: 0.5,
						borderRadius: 999,
						fontSize: "0.75rem",
						backgroundColor: "background.paper",
						border: "1px solid",
						borderColor: "divider",
						boxShadow: 1,
						pointerEvents: "none",
					}}
				>
					Zoom ready soon
				</Box>
			) : null}
			{title ? (
				<Box component="figcaption" sx={{ mt: 1, color: "text.secondary", fontSize: "0.88rem" }}>
					{title}
				</Box>
			) : null}
		</Box>
	);
}
