import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { authorConfig, iconConfig, seoDefaults, siteMetadata, viewportConfig } from "@/config";
import { AppProviders } from "@/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const primaryAuthor = authorConfig.authors[authorConfig.primaryAuthorId];

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.domain),
  title: {
    default: seoDefaults.defaultTitle,
    template: seoDefaults.titleTemplate,
  },
  description: seoDefaults.defaultDescription,
  keywords: [...seoDefaults.keywords],
  robots: {
    index: seoDefaults.robots.index,
    follow: seoDefaults.robots.follow,
    noarchive: seoDefaults.robots.noarchive,
    nocache: seoDefaults.robots.nocache,
    googleBot: {
      index: seoDefaults.robots.googleBot.index,
      follow: seoDefaults.robots.googleBot.follow,
      "max-image-preview": seoDefaults.robots.googleBot["max-image-preview"],
      "max-video-preview": seoDefaults.robots.googleBot["max-video-preview"],
      "max-snippet": seoDefaults.robots.googleBot["max-snippet"],
    },
  },
  openGraph: {
    type: seoDefaults.openGraph.type,
    siteName: seoDefaults.openGraph.siteName,
    locale: seoDefaults.openGraph.locale,
    url: siteMetadata.domain,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    images: [
      {
        url: seoDefaults.openGraph.defaultImage.url,
        width: seoDefaults.openGraph.defaultImage.width,
        height: seoDefaults.openGraph.defaultImage.height,
        alt: seoDefaults.openGraph.defaultImage.alt,
      },
    ],
  },
  twitter: {
    card: seoDefaults.twitter.card,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    creator: seoDefaults.twitter.creator || `@${primaryAuthor.username}`,
    site: seoDefaults.twitter.site || undefined,
    images: [seoDefaults.openGraph.defaultImage.url],
  },
  icons: {
    icon: iconConfig.icon,
    shortcut: iconConfig.shortcut,
    apple: iconConfig.apple,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: viewportConfig.colorScheme,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: viewportConfig.themeColor.light,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: viewportConfig.themeColor.dark,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteMetadata.language} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <AppProviders>
          <main id="main-content">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
