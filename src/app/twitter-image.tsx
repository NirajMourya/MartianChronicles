import { ImageResponse } from "next/og";

import { siteMetadata } from "@/config";

export const runtime = "edge";
export const alt = `${siteMetadata.name} Twitter Card`;
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "64px",
					background: "linear-gradient(140deg, #0b111a 0%, #141b25 60%, #1e2734 100%)",
					color: "#f3f5f8",
					fontFamily: "Inter",
				}}
			>
				<div style={{ fontSize: 24, letterSpacing: 2, color: "#ff8a5b" }}>MARTIAN CHRONICLES</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
					<div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{siteMetadata.name}</div>
					<div style={{ fontSize: 30, color: "#d7deea" }}>{siteMetadata.description}</div>
				</div>
				<div style={{ fontSize: 22, color: "#9ea8b8" }}>{siteMetadata.domain}</div>
			</div>
		),
		size,
	);
}
