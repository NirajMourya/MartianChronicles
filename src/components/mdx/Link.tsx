import type { AnchorHTMLAttributes } from "react";

import { Link as SharedLink } from "@/components/shared";

export interface MdxLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	readonly href?: string;
}

/**
 * MDX link mapper using shared link behavior.
 */
export function Link({ href, children, ...props }: MdxLinkProps) {
	if (!href) {
		return <span>{children}</span>;
	}

	return (
		<SharedLink href={href} {...props}>
			{children}
		</SharedLink>
	);
}
