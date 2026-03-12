import type { SanityDocument, Slug } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

/**
 * Interface for Partners page document type
 */
export interface Partners extends SanityDocument {
	_type: 'partners'
	title: string
	slug: Slug
	content?: PortableTextBlock[]
	getStamps?: PortableTextBlock[]
}
