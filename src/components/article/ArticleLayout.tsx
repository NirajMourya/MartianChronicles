import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import { authorConfig, siteMetadata } from "@/config";
import type { Article, HeadingOutlineItem } from "@/lib/content";
import { extractHeadingsFromMarkdown, formatContentDate } from "@/lib/content";

import { Button } from "@/components/ui";
import { Heading, Link, Text } from "@/components/shared";
import { PageContainer } from "@/components/layout";
import { Card, Chip, Grid, Section, Stack, Surface } from "@/components/ui";

import { ReadingProgress } from "./ReadingProgress";
import { ShareActions } from "./ShareActions";
import { TableOfContents } from "./TableOfContents";

export interface ArticleLayoutProps {
	readonly article: Article;
	readonly children: ReactNode;
	readonly previousArticle?: { title: string; href: string };
	readonly nextArticle?: { title: string; href: string };
	readonly relatedArticles?: readonly { title: string; href: string }[];
	readonly headings?: readonly HeadingOutlineItem[];
}

/**
 * Reusable article reading layout with metadata, placeholders, and long-form typography spacing.
 */
export function ArticleLayout({
	article,
	children,
	previousArticle,
	nextArticle,
	relatedArticles = [],
	headings,
}: ArticleLayoutProps) {
	const author = authorConfig.authors[article.author] ?? authorConfig.authors[authorConfig.primaryAuthorId];
	const resolvedHeadings = headings ?? extractHeadingsFromMarkdown(article.body);
	const articleUrl = article.canonicalUrl ?? `${siteMetadata.domain}${article.url}`;

	return (
		<>
			<ReadingProgress />
			<Section as="article" sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 4, md: 6 } }}>
				<PageContainer>
					<Stack spacing={3} data-reading-progress>
						<Breadcrumbs aria-label="Breadcrumb">
							<Link href="/">Home</Link>
							<Link href="/articles">Articles</Link>
							<Typography color="text.primary">{article.title}</Typography>
						</Breadcrumbs>

						{article.coverImage ? (
							<Box sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
								<Image
									src={article.coverImage}
									alt={article.coverAlt ?? article.title}
									width={1440}
									height={760}
									style={{ width: "100%", height: "auto", display: "block" }}
								/>
							</Box>
						) : null}

						<Stack spacing={1.25}>
							<Stack direction="row" spacing={1} flexWrap="wrap">
								{article.category ? <Chip label={article.category} size="small" color="primary" /> : null}
								{article.tags.map((tag) => (
									<Chip key={tag} label={`#${tag}`} size="small" />
								))}
							</Stack>
							<Heading level={1}>{article.title}</Heading>
							<Text component="p" variant="bodyLarge">
								{article.description}
							</Text>
						</Stack>

						<Grid minItemWidth={240} gap={2}>
							<Surface sx={{ p: 2 }}>
								<Stack spacing={0.5}>
									<Typography variant="overline" color="text.secondary">
										Author
									</Typography>
									<Typography variant="body2">{author.name}</Typography>
								</Stack>
							</Surface>
							<Surface sx={{ p: 2 }}>
								<Stack spacing={0.5}>
									<Typography variant="overline" color="text.secondary">
										Published
									</Typography>
									<Typography variant="body2">
										{article.publishedDate ? formatContentDate(article.publishedDate) : "Unpublished"}
									</Typography>
								</Stack>
							</Surface>
							<Surface sx={{ p: 2 }}>
								<Stack spacing={0.5}>
									<Typography variant="overline" color="text.secondary">
										Updated
									</Typography>
									<Typography variant="body2">
										{article.updatedDate ? formatContentDate(article.updatedDate) : "-"}
									</Typography>
								</Stack>
							</Surface>
							<Surface sx={{ p: 2 }}>
								<Stack spacing={0.5}>
									<Typography variant="overline" color="text.secondary">
										Reading Time
									</Typography>
									<Typography variant="body2">{article.readingTimeMinutes} min read</Typography>
								</Stack>
							</Surface>
						</Grid>

						<Grid minItemWidth={280} gap={2}>
							<Surface sx={{ p: { xs: 2, md: 3 }, display: { xs: "none", md: "block" } }}>
								<Typography variant="overline" color="text.secondary" component="h2">
									Table of Contents
								</Typography>
								<TableOfContents headings={resolvedHeadings} mode="desktop" />
							</Surface>
							<Surface sx={{ p: { xs: 2, md: 3 }, display: { xs: "block", md: "none" } }}>
								<Typography variant="overline" color="text.secondary" component="h2">
									Jump to section
								</Typography>
								<TableOfContents headings={resolvedHeadings} mode="mobile" />
							</Surface>
						</Grid>

						<Box
							id="article-content"
							sx={{
								maxWidth: 780,
								mx: "auto",
								fontSize: { xs: "1rem", md: "1.06rem" },
								lineHeight: 1.86,
								"& > :first-of-type": { mt: 0 },
								"& p": { my: 2.1 },
								"& ul, & ol": { my: 2.1, pl: 3.5 },
								"& li": { my: 0.8 },
								"& .footnotes": {
									mt: 4,
									pt: 3,
									borderTop: "1px solid",
									borderColor: "divider",
									fontSize: "0.92rem",
								},
								"& .footnotes ol": {
									pl: 3,
								},
								"& .footnote-backref": {
									textDecoration: "none",
									fontWeight: 700,
								},
								"& sup a": {
									textDecoration: "none",
								},
								"& hr": {
									border: 0,
									height: 1,
									my: 4,
									backgroundColor: "divider",
								},
								"& table": {
									fontSize: "0.94rem",
								},
								"& th, & td": {
									px: 1.5,
									py: 1,
									borderBottom: "1px solid",
									borderColor: "divider",
								},
								"& blockquote": { my: 3 },
								"& pre": { my: 0 },
								"& img": { maxWidth: "100%", height: "auto" },
							}}
						>
							{children}
						</Box>

						<Stack spacing={2}>
							<Heading level={3} component="h2" variant="h5">
								Tags, Topics & Technologies
							</Heading>
							<Stack direction="row" spacing={1} flexWrap="wrap">
								{article.topics.map((topic) => (
									<Chip key={`topic-${topic}`} label={topic} size="small" color="primary" variant="outlined" />
								))}
								{article.technologies.map((tech) => (
									<Chip key={`tech-${tech}`} label={tech} size="small" variant="outlined" />
								))}
							</Stack>
						</Stack>

						<Grid minItemWidth={280} gap={2}>
							<Card>
								<CardContent>
									<Typography variant="overline" color="text.secondary">
										Previous Article
									</Typography>
									<Typography variant="body2" color="text.primary">
										{previousArticle ? previousArticle.title : "Placeholder previous article"}
									</Typography>
								</CardContent>
								{previousArticle ? (
									<CardActions>
										<Button component="a" href={previousArticle.href} variant="outlined" size="small">
											Read previous
										</Button>
									</CardActions>
								) : null}
							</Card>
							<Card>
								<CardContent>
									<Typography variant="overline" color="text.secondary">
										Next Article
									</Typography>
									<Typography variant="body2" color="text.primary">
										{nextArticle ? nextArticle.title : "Placeholder next article"}
									</Typography>
								</CardContent>
								{nextArticle ? (
									<CardActions>
										<Button component="a" href={nextArticle.href} variant="outlined" size="small">
											Read next
										</Button>
									</CardActions>
								) : null}
							</Card>
						</Grid>

						<Surface sx={{ p: 2.5 }}>
							<Stack spacing={1.5}>
								<Typography variant="overline" color="text.secondary">
									Related Articles
								</Typography>
								{relatedArticles.length > 0 ? (
									<Stack component="ul" spacing={1} sx={{ m: 0, pl: 2 }}>
										{relatedArticles.map((related) => (
											<Box component="li" key={related.href}>
												<Link href={related.href}>{related.title}</Link>
											</Box>
										))}
									</Stack>
								) : (
									<Text variant="body2">Related content placeholder.</Text>
								)}
							</Stack>
						</Surface>

						<Surface sx={{ p: 2.5 }}>
							<Stack spacing={1.5}>
								<Typography variant="overline" color="text.secondary">
									Share
								</Typography>
								<ShareActions title={article.title} url={articleUrl} />
							</Stack>
						</Surface>

						<Text variant="caption" color="text.secondary" component="p" sx={{ textAlign: "center" }}>
							Published on {siteMetadata.name}
						</Text>
					</Stack>
				</PageContainer>
			</Section>
		</>
	);
}
