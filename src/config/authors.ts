import type { AbsoluteUrl } from "./site";
import type { SocialPlatform } from "./social";
import { socialProfiles } from "./social";

export interface AuthorSocialLink {
  readonly platform: SocialPlatform;
  readonly href: AbsoluteUrl | `mailto:${string}`;
}

export interface AuthorProfile {
  readonly id: string;
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly avatarPath: string;
  readonly bio: string;
  readonly location: string;
  readonly role: string;
  readonly social: readonly AuthorSocialLink[];
}

export interface AuthorConfig {
  readonly primaryAuthorId: string;
  readonly authors: Readonly<Record<string, AuthorProfile>>;
}

const nirajMourya: AuthorProfile = Object.freeze({
  id: "niraj-mourya",
  username: "nirajmourya",
  name: "Niraj Mourya",
  email: "nirajmourya786@gmail.com",
  avatarPath: "/images/authors/niraj-mourya.jpg",
  bio: "Engineer and writer documenting software, AI, systems thinking, and long-term learning.",
  location: "India",
  role: "Founder",
  social: Object.freeze([
    Object.freeze({
      platform: socialProfiles.github.platform,
      href: socialProfiles.github.href,
    }),
    Object.freeze({
      platform: socialProfiles.linkedin.platform,
      href: socialProfiles.linkedin.href,
    }),
    Object.freeze({
      platform: socialProfiles.devto.platform,
      href: socialProfiles.devto.href,
    }),
    Object.freeze({
      platform: socialProfiles.portfolio.platform,
      href: socialProfiles.portfolio.href,
    }),
    Object.freeze({
      platform: socialProfiles.email.platform,
      href: socialProfiles.email.href,
    }),
  ]),
});

export const authorConfig: AuthorConfig = Object.freeze({
  primaryAuthorId: nirajMourya.id,
  authors: Object.freeze({
    [nirajMourya.id]: nirajMourya,
  }),
});
