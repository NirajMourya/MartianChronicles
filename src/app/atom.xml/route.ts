import { generateAtomXml } from "@/lib/seo";

export const revalidate = 3600;

export function GET() {
	const xml = generateAtomXml();
	return new Response(xml, {
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
