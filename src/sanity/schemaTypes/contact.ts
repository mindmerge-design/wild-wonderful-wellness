import type { PortableTextBlock } from '@portabletext/types'
import type { SanityDocument, Slug } from 'sanity'

export type SocialPlatform =
	| 'facebook'
	| 'instagram'
	| 'linkedin'
	| 'tiktok'
	| 'twitter'
	| 'vimeo'
	| 'yelp'
	| 'youtube'
	| 'pinterest'

export interface SocialLink {
	_type: 'social'
	_key?: string
	socialSite?: SocialPlatform
	socialUrl?: string
}

/**
 * Interface for Contact page document type
 */
export interface Contact extends SanityDocument {
	_type: 'contact'
	title: string
	slug: Slug
	phone?: string
	email?: string
	content?: PortableTextBlock[]
	faqs?: Array<{
		_type: 'titleAndDescription'
		title: string
		description: PortableTextBlock[]
	}>
	social?: SocialLink[]
}
