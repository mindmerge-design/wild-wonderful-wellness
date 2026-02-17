import type { ImageAsset, SanityDocument, Slug } from 'sanity'
import type { BlockContent } from './blockContent'
import type { SEO } from './seo'

export interface ImageAlt {
	_type: 'imageAlt'
	asset: ImageAsset
	alt?: string
}

export interface Hero {
	_type: 'hero'
	heroContent?: BlockContent
	heroImage?: ImageAlt
}

/**
 * Interface for Home document type
 */
export interface Home extends SanityDocument {
	_type: 'home'
	title: string
	slug: Slug
	hero?: Hero
	content?: BlockContent
	seo?: SEO
}
