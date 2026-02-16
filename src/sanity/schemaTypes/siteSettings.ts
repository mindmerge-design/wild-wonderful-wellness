import type { Image } from 'sanity'
import type { ImageAlt } from './imageAlt'

type PortableText = unknown[]

export interface HowItWorksStep {
	_key: string
	icon?: ImageAlt
	title: string
	description: string
}

export interface SocialLink {
	socialSite?: string
	socialUrl?: string
}

export interface SiteSettings {
	_type: 'siteSettings'
	siteUrl?: string
	siteName: string
	siteDescription?: string
	siteEmail?: string
	sitePhone?: string
	locations?: unknown[]
	sharingImage?: Image
	heroImage?: ImageAlt
	heroHeadline?: string
	heroSubheadline?: string
	introText?: PortableText
	introStat?: string
	introStatLabel?: string
	howItWorksSteps?: HowItWorksStep[]
	prizesTeaser?: PortableText
	passportBookletImage?: ImageAlt
	parksIntroText?: PortableText
	partnersIntroText?: PortableText
	eventsIntroText?: PortableText
	footerAddress?: string
	footerPhone?: string
	socialMedia?: SocialLink[]
	disclaimer?: PortableText
}
