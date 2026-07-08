import type { MetadataRoute } from "next";

import { iconConfig, siteMetadata } from "@/config";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteMetadata.name,
		short_name: "Martian",
		description: siteMetadata.description,
		start_url: "/",
		display: "standalone",
		background_color: "#07090e",
		theme_color: "#ff5a1f",
		lang: siteMetadata.language,
		icons: [
			{
				src: iconConfig.icon,
				sizes: "any",
				type: "image/svg+xml",
			},
			{
				src: iconConfig.apple,
				sizes: "180x180",
				type: "image/svg+xml",
				purpose: "any",
			},
		],
	};
}
