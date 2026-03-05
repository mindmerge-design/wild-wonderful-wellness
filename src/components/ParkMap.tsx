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
			style: 'mapbox://styles/giraldomac/cmme247c000io01s1fp708n02',
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
					<div style="display:flex;align-items:center;gap:6px;background:#FDFCF8;border-radius:9999px;padding:5px 10px 5px 5px;box-shadow:0 4px 12px rgba(93,112,82,0.2);border:1.5px solid #DED8CF;cursor:pointer;transition:all 0.2s;font-family:Nunito,sans-serif;" onmouseenter="this.style.boxShadow='0 6px 20px rgba(93,112,82,0.3)';this.style.transform='scale(1.05)'" onmouseleave="this.style.boxShadow='0 4px 12px rgba(93,112,82,0.2)';this.style.transform='scale(1)'">
						<div style="width:20px;height:20px;border-radius:50%;background:#5D7052;display:flex;align-items:center;justify-content:center;color:#F3F4F1;font-size:11px;font-weight:700;flex-shrink:0;">
							${index + 1}
						</div>
						<span style="font-size:11px;font-weight:600;color:#2C2C24;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${park.title}</span>
					</div>
				`

				// Create popup
				const popup = new mapboxgl.Popup({
					offset: 25,
					closeButton: false,
					closeOnClick: false
				}).setHTML(`
					<div style="padding:8px 4px 4px;font-family:Nunito,sans-serif;min-width:140px;">
						<h3 style="font-weight:700;color:#5D7052;margin:0 0 4px;font-size:13px;line-height:1.3;">${park.title}</h3>
						<p style="font-size:11px;color:#78786C;margin:0 0 8px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${park.shortDescription || ''}</p>
						<a
							href="/parks-and-trails/${slug}"
							style="display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:700;color:#C18C5D;text-decoration:none;"
							onmouseenter="this.style.color='#5D7052'"
							onmouseleave="this.style.color='#C18C5D'"
							onclick="event.stopPropagation()"
						>
							Learn More
							<svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
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
						parkCard.classList.add('ring-2', 'ring-primary')
						setTimeout(() => parkCard.classList.remove('ring-2', 'ring-primary'), 2000)
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
			<div ref={mapContainer} className="h-full w-full"  />
		</div>
	)
}
