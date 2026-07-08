import Box from "@mui/material/Box";

export interface YouTubeProps {
	readonly id: string;
	readonly title?: string;
}

/**
 * Responsive YouTube embed for MDX.
 */
export function YouTube({ id, title = "YouTube video" }: YouTubeProps) {
	return (
		<Box sx={{ position: "relative", pt: "56.25%", my: 3, borderRadius: 2, overflow: "hidden" }}>
			<Box
				component="iframe"
				src={`https://www.youtube.com/embed/${id}`}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					border: 0,
				}}
			/>
		</Box>
	);
}
