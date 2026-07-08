interface StructuredDataProps {
	readonly data: unknown;
	readonly id?: string;
}

export function StructuredData({ data, id }: StructuredDataProps) {
	return (
		<script
			type="application/ld+json"
			id={id}
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
