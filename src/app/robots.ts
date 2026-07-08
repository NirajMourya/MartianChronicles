import type { MetadataRoute } from "next";

import { siteMetadata } from "@/config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/_next/", "/internal/"],
		},
		sitemap: `${siteMetadata.domain}/sitemap.xml`,
		host: siteMetadata.domain,
	};
}
