import type { SanityDocument, Slug } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

/**
 * Interface for Events page document type
 */
export interface Events extends SanityDocument {
	_type: 'events'
	title: string
	slug: Slug
	content?: PortableTextBlock[]
	getStamps?: PortableTextBlock[]
}
