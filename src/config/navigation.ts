import { socialLinks, socialProfiles } from "./social";

export interface NavigationItem {
	readonly label: string;
	readonly href: string;
	readonly external: boolean;
}

export interface FooterLinkSection {
	readonly title: string;
	readonly links: readonly NavigationItem[];
}

export interface NavigationConfig {
	readonly primary: readonly NavigationItem[];
	readonly cta: NavigationItem;
	readonly footer: readonly FooterLinkSection[];
}

export const navigationConfig: NavigationConfig = Object.freeze({
	primary: Object.freeze([
		Object.freeze({ label: "Home", href: "/", external: false }),
		Object.freeze({ label: "Articles", href: "/articles", external: false }),
		Object.freeze({ label: "Series", href: "/series", external: false }),
		Object.freeze({ label: "Projects", href: "/projects", external: false }),
		Object.freeze({ label: "Resources", href: "/resources", external: false }),
		Object.freeze({ label: "About", href: "/about", external: false }),
		Object.freeze({ label: "Search", href: "/search", external: false }),
	]),
	cta: Object.freeze({
		label: socialProfiles.portfolio.label,
		href: socialProfiles.portfolio.href,
		external: socialProfiles.portfolio.external,
	}),
	footer: Object.freeze([
		Object.freeze({
			title: "Explore",
			links: Object.freeze([
				Object.freeze({ label: "Articles", href: "/articles", external: false }),
				Object.freeze({ label: "Series", href: "/series", external: false }),
				Object.freeze({ label: "Projects", href: "/projects", external: false }),
				Object.freeze({ label: "Resources", href: "/resources", external: false }),
			]),
		}),
		Object.freeze({
			title: "Connect",
			links: Object.freeze(
				socialLinks.footer.map((link) =>
					Object.freeze({
						label: link.label,
						href: link.href,
						external: link.external,
					}),
				),
			),
		}),
	]),
});
