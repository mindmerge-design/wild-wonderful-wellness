// Site Settings
export const settingsQuery = `*[_type == "siteSettings"][0]{
  ...,
  heroImage{..., asset->},
  passportBookletImage{..., asset->},
  howItWorksSteps[]{..., icon{..., asset->}},
  socialMedia[]
}`

export const homeQuery = `*[_type == "home"][0]{
  title,
  slug,
  hero{heroImage{..., asset->}},
  content,
  howItWorks[]{..., icon},
  pricesContent,
  seo{..., sharingImage{..., asset->}}
}`

export const featuredParksQuery = `*[_type == "parkTrail"] | order(order asc) {
  _id, title, slug, shortDescription, mainImage{..., asset->}, parkType, amenities, coordinates
}`

export const allParksQuery = `*[_type == "parkTrail"] | order(order asc) {
  _id, title, slug, shortDescription, mainImage{..., asset->}, parkType, amenities, coordinates
}`

export const parkBySlugQuery = `*[_type == "parkTrail" && slug.current == $slug][0]{
  ..., mainImage{..., asset->}, lockboxPhoto{..., asset->}, gallery{..., images[]{..., asset->}},
  seo{..., sharingImage{..., asset->}}
}`

export const featuredPartnersQuery = `*[_type == "partner"] | order(order asc) [0...8] {
  _id, title, slug, shortDescription, logo{..., asset->}, mainImage{..., asset->},
  partnerType, hasPassportPickup
}`

export const allPartnersQuery = `*[_type == "partner"] | order(order asc) {
  _id, title, slug, shortDescription, logo{..., asset->}, mainImage{..., asset->},
  partnerType, hasPassportPickup, hasStampStation
}`

export const partnerBySlugQuery = `*[_type == "partner" && slug.current == $slug][0]{
  ..., logo{..., asset->}, mainImage{..., asset->}, seo{..., sharingImage{..., asset->}}
}`

export const upcomingEventsQuery = `*[_type == "event" && eventDate >= now()] | order(eventDate asc) [0...6] {
  _id, title, slug, shortDescription, mainImage{..., asset->},
  eventDate, endDate, location, isFree, cost, registrationUrl
}`

export const allEventsQuery = `*[_type == "event"] | order(eventDate asc) {
  _id, title, slug, shortDescription, mainImage{..., asset->},
  eventDate, endDate, location, isFree, cost, registrationUrl
}`

export const eventBySlugQuery = `*[_type == "event" && slug.current == $slug][0]{
  ..., mainImage{..., asset->}, relatedPartner->{title, slug},
  seo{..., sharingImage{..., asset->}}
}`

export const eventsByPartnerQuery = `*[_type == "event" && relatedPartner._ref == $partnerId] | order(eventDate asc) {
  _id, title, slug, eventDate, location, isFree
}`

export const genericQuery = `*[_type == "generic"]`

export const genericBySlugQuery = `*[_type == "generic" && slug.current == $slug][0]{
  title,
  slug,
  pageBuilder[]{...}
}`

export const parksTrailsPageQuery = `*[_type == "parksTrails"][0]{
  title,
  slug,
  content
}`

export const eventsPageQuery = `*[_type == "events"][0]{
  title,
  slug,
  getStamps,
  content
}`

export const partnersPageQuery = `*[_type == "partners"][0]{
  title,
  slug,
  content,
  getStamps
}`

export const contactPageQuery = `*[_type == "contact"][0]{
  title,
  slug,
  content,
  faqs
}`
