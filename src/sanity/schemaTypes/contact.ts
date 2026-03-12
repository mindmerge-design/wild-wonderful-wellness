import type { PortableTextBlock } from '@portabletext/types'
import type { SanityDocument, Slug } from 'sanity'

/**
 * Interface for Contact page document type
 */
export interface Contact extends SanityDocument {
	_type: 'contact'
	title: string
	slug: Slug
	content?: PortableTextBlock[]
	faqs?: Array<{
		_type: 'titleAndDescription'
		title: string
		description: PortableTextBlock[]
	}>
}
