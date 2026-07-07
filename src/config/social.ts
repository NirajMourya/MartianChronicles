import type { AbsoluteUrl } from "./site";

export type SocialPlatform =
	| "github"
	| "linkedin"
	| "devto"
	| "portfolio"
	| "email";

export interface SocialLink {
	readonly platform: SocialPlatform;
	readonly label: string;
	readonly href: AbsoluteUrl | `mailto:${string}`;
	readonly external: boolean;
}

export interface SocialConfig {
	readonly primary: readonly SocialLink[];
	readonly footer: readonly SocialLink[];
}

export interface SocialProfiles {
	readonly github: SocialLink;
	readonly linkedin: SocialLink;
	readonly devto: SocialLink;
	readonly portfolio: SocialLink;
	readonly email: SocialLink;
}

/**
 * Canonical social profiles for the platform.
 *
 * Keep profile URLs centralized here to avoid drift across author, navigation,
 * and footer configurations.
 */
export const socialProfiles: SocialProfiles = Object.freeze({
	github: Object.freeze({
		platform: "github",
		label: "GitHub",
		href: "https://github.com/NirajMourya",
		external: true,
	}),
	linkedin: Object.freeze({
		platform: "linkedin",
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/niraj-mourya/",
		external: true,
	}),
	devto: Object.freeze({
		platform: "devto",
		label: "Dev.to",
		href: "https://dev.to/nirajmourya",
		external: true,
	}),
	portfolio: Object.freeze({
		platform: "portfolio",
		label: "Portfolio",
		href: "https://nirajmourya.in",
		external: true,
	}),
	email: Object.freeze({
		platform: "email",
		label: "Email",
		href: "mailto:nirajmourya786@gmail.com",
		external: true,
	}),
});

export const socialLinks: SocialConfig = Object.freeze({
	primary: Object.freeze([
		socialProfiles.github,
		socialProfiles.linkedin,
		socialProfiles.devto,
		socialProfiles.portfolio,
		socialProfiles.email,
	]),
	footer: Object.freeze([
		socialProfiles.github,
		socialProfiles.linkedin,
		socialProfiles.devto,
		socialProfiles.email,
	]),
});
