import type { ParkTrail } from '@/sanity/schemaTypes/parkTrail'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'

interface ParkMapProps {
	parks: ParkTrail[]
	mapboxToken: string
}

export default function ParkMap({ parks, mapboxToken }: ParkMapProps) {
	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<mapboxgl.Map | null>(null)
	const [activePark, setActivePark] = useState<string | null>(null)
	const [zoom, setZoom] = useState(11)

	useEffect(() => {
		if (!mapContainer.current || map.current) return

		mapboxgl.accessToken = mapboxToken

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v11',
			center: [-79.91, 39.63],
			zoom: 11,
			attributionControl: false,
			scrollZoom: false
		})

		map.current.on('load', () => {
			// Add navigation controls (zoom, rotate, pitch)
			map.current?.addControl(
				new mapboxgl.NavigationControl({
					showCompass: true,
					showZoom: true,
					visualizePitch: true
				}),
				'top-right'
			)

			// Add fullscreen control
			map.current?.addControl(
				new mapboxgl.FullscreenControl(),
				'top-right'
			)

			// Add geolocation control (find my location)
			map.current?.addControl(
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true
					},
					trackUserLocation: true,
					showUserHeading: true
				}),
				'top-right'
			)

			// Add scale control
			map.current?.addControl(
				new mapboxgl.ScaleControl({
					maxWidth: 100,
					unit: 'imperial'
				}),
				'bottom-left'
			)

			// Collect all coordinates for bounds
			const bounds = new mapboxgl.LngLatBounds()

			// Add markers for each park
			parks.forEach((park, index) => {
				// Convert Sanity coordinates {lat, lng} to Mapbox [lng, lat]
				const coordinates: [number, number] | null = park.coordinates 
					? [park.coordinates.lng, park.coordinates.lat] 
					: null
				if (!coordinates) return

				// Generate slug for park detail page link
				const slug = park.slug?.current || (park.title || 'park').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

				// Extend bounds to include this park
				bounds.extend(coordinates)

				// Create custom marker element
				const markerEl = document.createElement('div')
				markerEl.className = 'custom-marker'
				markerEl.innerHTML = `
					<div class="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1.5 shadow-lg border border-emerald-200 cursor-pointer hover:shadow-xl transition-all hover:scale-105">
						<div class="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white! text-xs font-bold">
							${index + 1}
						</div>
						<span class="text-xs font-medium text-gray-800 max-w-[80px] truncate">${park.title}</span>
					</div>
				`

				// Create popup
				const popup = new mapboxgl.Popup({
					offset: 25,
					closeButton: false,
					closeOnClick: false
				}).setHTML(`
					<div class="p-2">
						<h3 class="font-bold text-emerald-700 mt-0!">${park.title}</h3>
						<p class="text-xs text-gray-600 mt-1 line-clamp-2">${park.shortDescription || ''}</p>
						<a 
							href="/parks-and-trails/${slug}" 
							class="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-800 hover:underline"
							onclick="event.stopPropagation()"
						>
							Learn More
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</a>
					</div>
				`)

				const marker = new mapboxgl.Marker(markerEl)
					.setLngLat(coordinates)
					.setPopup(popup)
					.addTo(map.current!)

				// Track currently open popup
				let currentPopup: mapboxgl.Popup | null = null

				markerEl.addEventListener('mouseenter', () => {
					setActivePark(park.title || '')
					// Close previous popup if exists
					if (currentPopup && currentPopup !== popup) {
						currentPopup.remove()
					}
					marker.setPopup(popup)
					popup.addTo(map.current!)
					currentPopup = popup
				})

				markerEl.addEventListener('click', (e) => {
					e.stopPropagation()
					// Close previous popup if exists
					if (currentPopup && currentPopup !== popup) {
						currentPopup.remove()
					}
					marker.setPopup(popup)
					popup.addTo(map.current!)
					currentPopup = popup
					
					// Fly to park location
					map.current?.flyTo({
						center: coordinates,
						zoom: 14,
						duration: 1500,
						easing: (t) => t * (2 - t)
					})

					// Scroll to park card in list
					const parkCard = document.getElementById(`park-${index}`)
					if (parkCard) {
						parkCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
						parkCard.classList.add('ring-2', 'ring-emerald-400')
						setTimeout(() => parkCard.classList.remove('ring-2', 'ring-emerald-400'), 2000)
					}
				})

				// Close popup when clicking on map
				map.current?.on('click', () => {
					popup.remove()
					currentPopup = null
				})
			})

			// Fit map to show all park bounds with padding
			if (!bounds.isEmpty()) {
				map.current?.fitBounds(bounds, {
					padding: { top: 50, bottom: 50, left: 50, right: 50 },
					duration: 1000,
					maxZoom: 14
				})
			}

			// Update zoom state when map zooms
			map.current?.on('zoom', () => {
				setZoom(map.current?.getZoom() || 11)
			})
		})

		return () => {
			map.current?.remove()
		}
	}, [parks, mapboxToken])

	const handleZoomIn = () => {
		map.current?.zoomIn({ duration: 500 })
	}

	const handleZoomOut = () => {
		map.current?.zoomOut({ duration: 500 })
	}

	const handleResetView = () => {
		map.current?.flyTo({
			center: [-79.91, 39.63],
			zoom: 11,
			duration: 1500
		})
	}

	return (
		<div className="relative h-full w-full rounded-2xl overflow-hidden">
			<div ref={mapContainer} className="h-full w-full" />
		</div>
	)
}
