import type { Slug } from 'sanity'
import type { ImageAlt } from './imageAlt'
import type { SEO } from './seo'

type PortableText = unknown[]

export type ParkType = 'park' | 'trail' | 'state-forest' | 'recreation-area'
export type Amenity = 'restrooms' | 'parking' | 'dog-friendly' | 'accessible' | 'picnic-area' | 'camping' | 'swimming' | 'fishing' | 'biking' | 'hiking'

export interface ParkTrail {
	_type: 'parkTrail'
	_id: string
	title: string
	slug: Slug
	shortDescription?: string
	mainImage?: ImageAlt
	content?: PortableText
	parkType?: ParkType
	amenities?: Amenity[]
	address?: PortableText
	coordinates?: { _type: 'geopoint'; lat: number; lng: number }
	hours?: PortableText
	phone?: string
	websiteUrl?: string
	lockboxLocation?: string
	lockboxPhoto?: ImageAlt
	gallery?: { images?: ImageAlt[] }
	featured?: boolean
	order?: number
	seo?: SEO
}
