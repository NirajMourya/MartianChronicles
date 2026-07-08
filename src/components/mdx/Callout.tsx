import Box from "@mui/material/Box";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LightbulbOutlined from "@mui/icons-material/LightbulbOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import ReportProblemOutlined from "@mui/icons-material/ReportProblemOutlined";
import type { ReactNode } from "react";

import { Text } from "@/components/shared";
import { Stack } from "@/components/ui";

export interface CalloutProps {
	readonly title?: string;
	readonly children: ReactNode;
	readonly tone?: "note" | "tip" | "warning" | "info";
}

const toneColor: Readonly<Record<NonNullable<CalloutProps["tone"]>, string>> = {
	note: "info.main",
	tip: "success.main",
	warning: "warning.main",
	info: "info.main",
};

const toneIcon: Readonly<Record<NonNullable<CalloutProps["tone"]>, ReactNode>> = {
	note: <InfoOutlined fontSize="small" />,
	tip: <LightbulbOutlined fontSize="small" />,
	warning: <WarningAmberOutlined fontSize="small" />,
	info: <ReportProblemOutlined fontSize="small" />,
};

/**
 * Future-ready callout block for MDX directives.
 */
export function Callout({ title, children, tone = "note" }: CalloutProps) {
	return (
		<Box
			role={tone === "warning" ? "alert" : "note"}
			sx={{
				my: 3,
				px: 2.25,
				py: 1.75,
				borderRadius: 3,
				border: "1px solid",
				borderColor: toneColor[tone],
				backgroundColor: "action.hover",
			}}
		>
			<Stack spacing={1}>
				<Stack direction="row" spacing={1} alignItems="center" component="div">
					<Box sx={{ color: toneColor[tone], display: "inline-flex" }} aria-hidden="true">
						{toneIcon[tone]}
					</Box>
					{title ? (
						<Text component="strong" color="text.primary">
							{title}
						</Text>
					) : null}
				</Stack>
				<Text component="div">{children}</Text>
			</Stack>
		</Box>
	);
}
