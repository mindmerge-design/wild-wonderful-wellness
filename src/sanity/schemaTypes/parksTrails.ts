import type { SanityDocument, Slug } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

/**
 * Interface for ParksTrails page document type
 */
export interface ParksTrails extends SanityDocument {
	_type: 'parksTrails'
	title: string
	slug: Slug
	content?: PortableTextBlock[]
}
