import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import {
  ArticleCard,
  Button,
  Card,
  Chip,
  FeaturedArticleCard,
  Grid,
  Heading,
  Link,
  PageContainer,
  Section,
  Stack,
  Surface,
  Text,
} from "@/components";
import styles from "./page.module.css";

const heroTagline = "Exploring Software, AI & Ideas Beyond Earth";

const featuredArticle = {
  title: "Engineering Calm Systems: Building Products That Age Gracefully",
  href: "/articles/engineering-calm-systems",
  excerpt:
    "A practical framework for balancing speed, maintainability, and user trust when systems evolve over years, not sprints.",
  publishedAt: "July 7, 2026",
  readingMinutes: 11,
  tags: ["architecture", "product", "systems"],
};

const latestArticles = [
  {
    title: "Type-Safe Frontend Architecture at Scale",
    href: "/articles/type-safe-frontend-architecture",
    excerpt: "Patterns for resilient interfaces across rapidly changing product surfaces.",
    publishedAt: "July 5, 2026",
    readingMinutes: 9,
    tags: ["typescript", "frontend", "architecture"],
  },
  {
    title: "A Practical AI Notes Workflow for Engineers",
    href: "/articles/ai-notes-workflow",
    excerpt: "How to combine deliberate notes with AI tooling without losing clarity.",
    publishedAt: "July 3, 2026",
    readingMinutes: 7,
    tags: ["ai", "notes", "learning"],
  },
  {
    title: "Designing APIs for Long-Term Product Evolution",
    href: "/articles/apis-for-long-term-evolution",
    excerpt: "Versioning and contract strategies that reduce migration pain.",
    publishedAt: "June 30, 2026",
    readingMinutes: 10,
    tags: ["api", "backend", "design"],
  },
  {
    title: "Writing Better Engineering Documentation",
    href: "/articles/better-engineering-documentation",
    excerpt: "A repeatable structure for docs that survive team and context changes.",
    publishedAt: "June 28, 2026",
    readingMinutes: 6,
    tags: ["writing", "docs", "engineering"],
  },
  {
    title: "From Side Project to Sustainable Platform",
    href: "/articles/side-project-to-platform",
    excerpt: "Operational and design decisions that help projects scale deliberately.",
    publishedAt: "June 22, 2026",
    readingMinutes: 8,
    tags: ["projects", "product", "growth"],
  },
  {
    title: "JavaScript Performance in Real User Journeys",
    href: "/articles/javascript-performance-journeys",
    excerpt: "Measure what users feel, then optimize bottlenecks with discipline.",
    publishedAt: "June 20, 2026",
    readingMinutes: 12,
    tags: ["javascript", "performance", "web"],
  },
];

const featuredProjects = [
  {
    name: "Martian Chronicles Engine",
    description:
      "A modular publishing core for long-form writing, notes, and knowledge archives.",
    technologies: ["Next.js", "TypeScript", "MDX"],
    githubUrl: "https://github.com/NirajMourya/martian-chronicles",
  },
  {
    name: "Orbit Index",
    description:
      "A taxonomy-first indexing layer for linking topics, tags, and series across content.",
    technologies: ["Node.js", "Zod", "Search"],
    githubUrl: "https://github.com/NirajMourya/orbit-index",
  },
  {
    name: "Signal Notes",
    description:
      "A learning notes system focused on recall, synthesis, and long-term thinking.",
    technologies: ["React", "MUI", "PostgreSQL"],
    githubUrl: "https://github.com/NirajMourya/signal-notes",
  },
];

const learningResources = [
  {
    title: "React",
    description: "Patterns, rendering models, and practical architecture references.",
    href: "/resources/react",
  },
  {
    title: "System Design",
    description: "Scalable systems, trade-offs, and practical reliability patterns.",
    href: "/resources/system-design",
  },
  {
    title: "AI",
    description: "Applied AI notes, workflows, and implementation guides for developers.",
    href: "/resources/ai",
  },
  {
    title: "JavaScript",
    description: "Language depth, runtime behavior, and high-performance web techniques.",
    href: "/resources/javascript",
  },
];

export default function Home() {
  return (
    <>
      <Section as="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 10 } }}>
        <PageContainer>
          <Grid minItemWidth={320} gap={5} sx={{ alignItems: "center" }}>
            <Stack spacing={2.5}>
              <Text component="span" variant="overline" color="primary.main">
                Thoughtful Engineering Journal
              </Text>
              <Heading level={1}>Martian Chronicles</Heading>
              <Text component="p" variant="bodyLarge">
                {heroTagline}
              </Text>
              <Text>
                A premium personal knowledge platform where engineering practice, learning notes,
                and long-form writing evolve into a connected body of ideas.
              </Text>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button component="a" href="/articles">
                  Read Articles
                </Button>
                <Button component="a" href="/projects" variant="outlined">
                  Explore Projects
                </Button>
              </Stack>
            </Stack>
            <Surface sx={{ p: { xs: 2, md: 3 }, display: "grid", placeItems: "center" }}>
              <svg
                className={styles.orbitGraphic}
                viewBox="0 0 320 320"
                width="100%"
                height="auto"
                role="img"
                aria-label="Subtle orbit graphic"
              >
                <circle cx="160" cy="160" r="58" className={styles.marsCore} />
                <circle cx="160" cy="160" r="94" className={styles.orbitRing} />
                <circle cx="160" cy="160" r="124" className={styles.orbitRingSoft} />
                <g className={styles.orbitObject}>
                  <circle cx="160" cy="66" r="7" className={styles.orbitDot} />
                </g>
              </svg>
            </Surface>
          </Grid>
        </PageContainer>
      </Section>

      <Section as="section">
        <PageContainer>
          <Stack spacing={3}>
            <Heading level={2}>Featured Article</Heading>
            <Grid minItemWidth={320} gap={3}>
              <Surface sx={{ p: 0, overflow: "hidden" }}>
                <Box
                  role="img"
                  aria-label="Placeholder article cover"
                  sx={{
                    width: "100%",
                    minHeight: { xs: 220, md: 320 },
                    background:
                      "linear-gradient(145deg, rgba(255,90,31,0.2) 0%, rgba(255,90,31,0.03) 68%)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
              </Surface>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <Chip size="small" color="primary" label="Featured" />
                  <Chip size="small" label="Engineering" />
                </Stack>
                <FeaturedArticleCard article={featuredArticle} />
                <Button component="a" href={featuredArticle.href} variant="outlined">
                  Read Article
                </Button>
              </Stack>
            </Grid>
          </Stack>
        </PageContainer>
      </Section>

      <Section as="section">
        <PageContainer>
          <Stack spacing={3}>
            <Heading level={2}>Latest Articles</Heading>
            <Grid minItemWidth={280} gap={2.5}>
              {latestArticles.map((article) => (
                <ArticleCard key={article.href} article={article} />
              ))}
            </Grid>
          </Stack>
        </PageContainer>
      </Section>

      <Section as="section">
        <PageContainer>
          <Stack spacing={3}>
            <Heading level={2}>Featured Projects</Heading>
            <Grid minItemWidth={280} gap={2.5}>
              {featuredProjects.map((project) => (
                <Card key={project.name} component="article">
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Heading level={3} variant="h5" component="h3">
                        {project.name}
                      </Heading>
                      <Text>{project.description}</Text>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {project.technologies.map((tech) => (
                          <Chip key={tech} label={tech} size="small" />
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                    >
                      View on GitHub
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Stack>
        </PageContainer>
      </Section>

      <Section as="section">
        <PageContainer>
          <Stack spacing={3}>
            <Heading level={2}>Learning Resources</Heading>
            <Grid minItemWidth={240} gap={2.5}>
              {learningResources.map((resource) => (
                <Card key={resource.title} component="article">
                  <CardContent>
                    <Stack spacing={1}>
                      <Heading level={3} variant="h6" component="h3">
                        <Link href={resource.href}>{resource.title}</Link>
                      </Heading>
                      <Text variant="body2">{resource.description}</Text>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Stack>
        </PageContainer>
      </Section>

      <Section as="section">
        <PageContainer>
          <Surface sx={{ p: { xs: 2.5, md: 4 } }}>
            <Grid minItemWidth={260} gap={3}>
              <Box
                aria-hidden="true"
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 700,
                  fontSize: 24,
                }}
              >
                NM
              </Box>
              <Stack spacing={1.25}>
                <Heading level={2}>About the Author</Heading>
                <Text>
                  Niraj Mourya is an engineer and writer documenting software architecture, AI
                  workflows, and practical learning systems. Martian Chronicles is the long-term
                  home for those ideas.
                </Text>
                <Stack direction="row" spacing={1.5}>
                  <Button component="a" href="/about" variant="outlined">
                    About Niraj
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Surface>
        </PageContainer>
      </Section>

      <Section as="section" sx={{ pb: { xs: 10, md: 14 } }}>
        <PageContainer>
          <Surface sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
            <Stack spacing={2} alignItems="center">
              <Heading level={2}>Continue the Journey</Heading>
              <Text sx={{ maxWidth: 620 }}>
                Explore long-form engineering essays, project breakdowns, and structured learning
                notes designed for thoughtful builders.
              </Text>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button component="a" href="/articles">
                  Browse Articles
                </Button>
                <Button component="a" href="/projects" variant="outlined">
                  View Projects
                </Button>
              </Stack>
            </Stack>
          </Surface>
        </PageContainer>
      </Section>
    </>
  );
}
