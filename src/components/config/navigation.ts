export interface NavigationItem {
	label: string
	href: string
	external?: boolean
	children?: NavigationItem[]
}

export const navigationConfig: NavigationItem[] = [
	{
		label: 'Home',
		href: '/'
	},
	{
		label: 'Parks & Trails',
		href: '/parks-trails'
	},
	{
		label: 'Events',
		href: '/events'
	},
	{
		label: 'Partners',
		href: '/partners'
	}
	// Add more navigation items as needed
	// Example:
	// {
	//   label: 'About',
	//   href: '/about',
	// },
	// {
	//   label: 'Contact',
	//   href: '/contact',
	// },
]

export const footerConfig = {
	showCopyright: true,
	showCredit: false, // Set to true and provide creditText/creditUrl if you want to show a credit link
	creditText: '',
	creditUrl: ''
}

export const socialLinks: Array<{
	platform: string
	url: string
	icon?: string
}> = [
	// Add your social media links here
	// Example:
	// {
	//   platform: 'twitter',
	//   url: 'https://twitter.com/yourhandle',
	// },
]
