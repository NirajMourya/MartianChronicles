import "server-only";

import type { ComponentPropsWithoutRef } from "react";

import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import { mdxRemarkPlugins } from "@/lib/content";

import { BlockQuote } from "./BlockQuote";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { GitHub } from "./GitHub";
import { Heading } from "./Heading";
import { Image } from "./Image";
import { InlineCode } from "./InlineCode";
import { Link } from "./Link";
import { Mermaid } from "./Mermaid";
import { Table } from "./Table";
import { YouTube } from "./YouTube";

export interface MDXProviderProps {
	readonly source: string;
}

const mdxComponents = {
	h1: (props: ComponentPropsWithoutRef<"h1">) => <Heading level={1} {...props}>{props.children}</Heading>,
	h2: (props: ComponentPropsWithoutRef<"h2">) => <Heading level={2} {...props}>{props.children}</Heading>,
	h3: (props: ComponentPropsWithoutRef<"h3">) => <Heading level={3} {...props}>{props.children}</Heading>,
	h4: (props: ComponentPropsWithoutRef<"h4">) => <Heading level={4} {...props}>{props.children}</Heading>,
	h5: (props: ComponentPropsWithoutRef<"h5">) => <Heading level={5} {...props}>{props.children}</Heading>,
	h6: (props: ComponentPropsWithoutRef<"h6">) => <Heading level={6} {...props}>{props.children}</Heading>,
	pre: (props: ComponentPropsWithoutRef<"pre">) => <CodeBlock {...props} />,
	code: (props: ComponentPropsWithoutRef<"code">) => {
		if ((props.className ?? "").includes("language-")) {
			return <CodeBlock {...props} />;
		}
		return <InlineCode {...props} />;
	},
	a: Link,
	img: Image,
	table: Table,
	blockquote: BlockQuote,
	Callout,
	YouTube,
	GitHub,
	Mermaid,
};

/**
 * Server-side MDX renderer with shared component mapping.
 */
export async function MDXProvider({ source }: MDXProviderProps) {
	const compiled = await evaluate(source, {
		...runtime,
		remarkPlugins: [...mdxRemarkPlugins],
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
		development: process.env.NODE_ENV !== "production",
	});

	const MDXContent = compiled.default;
	return <MDXContent components={mdxComponents} />;
}
