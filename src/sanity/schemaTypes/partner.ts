import type { Slug } from 'sanity'
import type { ImageAlt } from './imageAlt'
import type { SEO } from './seo'

type PortableText = unknown[]
export type PartnerType = 'fitness' | 'wellness' | 'recreation' | 'healthcare' | 'retail' | 'other'

export interface Partner {
	_type: 'partner'
	_id: string
	title: string
	slug: Slug
	shortDescription?: string
	logo?: ImageAlt
	mainImage?: ImageAlt
	content?: PortableText
	partnerType?: PartnerType
	address?: PortableText
	hours?: PortableText
	phone?: string
	websiteUrl?: string
	hasPassportPickup?: boolean
	hasStampStation?: boolean
	featured?: boolean
	order?: number
	seo?: SEO
}
