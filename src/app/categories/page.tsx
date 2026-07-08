import type { Metadata } from "next";

import { CategoryCard } from "@/components/content/CategoryCard";
import { DiscoveryPageShell } from "@/components/content/DiscoveryPageShell";
import { siteMetadata } from "@/config";
import { getAllCategories } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Categories",
		description: "Browse article categories.",
		alternates: { canonical: `${siteMetadata.domain}/categories` },
	};
}

export default function CategoriesIndexPage() {
	const categories = getAllCategories({ includeDrafts: false });

	return (
		<DiscoveryPageShell
			title="Categories"
			description="Browse the archive by editorial category."
			articleCount={categories.reduce((total, item) => total + item.count, 0)}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
		>
			{categories.map((category) => (
				<CategoryCard
					key={category.value}
					title={category.value}
					href={`/categories/${category.value}`}
					description={`Browse articles in ${category.value}.`}
					count={category.count}
				/>
			))}
		</DiscoveryPageShell>
	);
}
