import { generateJsonFeed } from "@/lib/seo";

export const revalidate = 3600;

export function GET() {
	const json = generateJsonFeed();
	return new Response(json, {
		headers: {
			"Content-Type": "application/feed+json; charset=utf-8",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
