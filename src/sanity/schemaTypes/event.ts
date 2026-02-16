import type { Slug } from 'sanity'
import type { ImageAlt } from './imageAlt'
import type { SEO } from './seo'

type PortableText = unknown[]

export interface Event {
	_type: 'event'
	_id: string
	title: string
	slug: Slug
	shortDescription?: string
	mainImage?: ImageAlt
	eventDate: string
	endDate?: string
	location?: string
	address?: string
	organizer?: string
	cost?: string
	isFree?: boolean
	websiteUrl?: string
	registrationUrl?: string
	content?: PortableText
	featured?: boolean
	relatedPartner?: { _ref: string; _type: 'reference'; title?: string; slug?: Slug }
	seo?: SEO
}
