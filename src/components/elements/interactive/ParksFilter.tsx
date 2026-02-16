import { useMemo, useState } from 'react'

interface SerializedPark {
	_id: string
	title: string
	slug: string
	shortDescription: string
	mainImage: string
	mainImageAlt: string
	parkType: string
	amenities: string[]
}

interface ParksFilterProps {
	parks: SerializedPark[]
}

const PARK_TYPES = [
	{ value: '', label: 'All Types' },
	{ value: 'park', label: 'Park' },
	{ value: 'trail', label: 'Trail' },
	{ value: 'state-forest', label: 'State Forest' },
	{ value: 'recreation-area', label: 'Recreation Area' }
]

export default function ParksFilter({ parks }: ParksFilterProps) {
	const [search, setSearch] = useState('')
	const [parkType, setParkType] = useState('')

	const filteredParks = useMemo(() => {
		return parks.filter((park) => {
			const matchesSearch =
				search === '' ||
				park.title.toLowerCase().includes(search.toLowerCase()) ||
				park.shortDescription.toLowerCase().includes(search.toLowerCase())

			const matchesType = parkType === '' || park.parkType === parkType

			return matchesSearch && matchesType
		})
	}, [parks, search, parkType])

	return (
		<div>
			{/* Filters */}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					marginBottom: '2rem'
				}}
			>
				<div style={{ flex: '1 1 300px' }}>
					<label
						htmlFor="park-search"
						style={{
							display: 'block',
							fontSize: '0.875rem',
							fontWeight: 500,
							marginBottom: '0.5rem',
							color: 'hsl(var(--foreground))'
						}}
					>
						Search Parks
					</label>
					<input
						id="park-search"
						type="text"
						placeholder="Search by name or description..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						style={{
							width: '100%',
							padding: '0.625rem 1rem',
							borderRadius: 'var(--radius-md)',
							border: '1px solid hsl(var(--border))',
							backgroundColor: 'hsl(var(--background))',
							color: 'hsl(var(--foreground))',
							fontSize: '0.875rem'
						}}
					/>
				</div>
				<div style={{ flex: '0 1 200px' }}>
					<label
						htmlFor="park-type"
						style={{
							display: 'block',
							fontSize: '0.875rem',
							fontWeight: 500,
							marginBottom: '0.5rem',
							color: 'hsl(var(--foreground))'
						}}
					>
						Park Type
					</label>
					<select
						id="park-type"
						value={parkType}
						onChange={(e) => setParkType(e.target.value)}
						style={{
							width: '100%',
							padding: '0.625rem 1rem',
							borderRadius: 'var(--radius-md)',
							border: '1px solid hsl(var(--border))',
							backgroundColor: 'hsl(var(--background))',
							color: 'hsl(var(--foreground))',
							fontSize: '0.875rem'
						}}
					>
						{PARK_TYPES.map((type) => (
							<option key={type.value} value={type.value}>
								{type.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Results count */}
			<p
				style={{
					fontSize: '0.875rem',
					color: 'hsl(var(--muted-foreground))',
					marginBottom: '1.5rem'
				}}
			>
				Showing {filteredParks.length} of {parks.length} parks & trails
			</p>

			{/* Card Grid */}
			{filteredParks.length > 0 ? (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
						gap: '1.5rem'
					}}
				>
					{filteredParks.map((park) => (
						<a
							key={park._id}
							href={`/parks-and-trails/${park.slug}`}
							style={{
								display: 'block',
								textDecoration: 'none',
								color: 'inherit',
								borderRadius: 'var(--radius-lg)',
								overflow: 'hidden',
								border: '1px solid hsl(var(--border))',
								backgroundColor: 'hsl(var(--card))',
								transition: 'box-shadow 0.2s ease'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.boxShadow =
									'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.boxShadow = 'none'
							}}
						>
							{park.mainImage && (
								<img
									src={park.mainImage}
									alt={park.mainImageAlt}
									width={600}
									height={400}
									loading="lazy"
									style={{
										width: '100%',
										aspectRatio: '3/2',
										objectFit: 'cover'
									}}
								/>
							)}
							<div style={{ padding: '1rem 1.25rem' }}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'flex-start',
										gap: '0.5rem'
									}}
								>
									<h3
										style={{
											fontSize: '1.125rem',
											fontWeight: 600,
											color: 'hsl(var(--foreground))',
											margin: 0
										}}
									>
										{park.title}
									</h3>
									{park.parkType && (
										<span
											style={{
												display: 'inline-flex',
												alignItems: 'center',
												borderRadius: '9999px',
												padding: '0.25rem 0.75rem',
												fontSize: '0.75rem',
												fontWeight: 500,
												backgroundColor: 'hsl(var(--primary) / 0.1)',
												color: 'hsl(var(--primary))',
												textTransform: 'capitalize',
												whiteSpace: 'nowrap'
											}}
										>
											{park.parkType.replace(/-/g, ' ')}
										</span>
									)}
								</div>
								{park.shortDescription && (
									<p
										style={{
											fontSize: '0.875rem',
											color: 'hsl(var(--muted-foreground))',
											marginTop: '0.5rem',
											display: '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden'
										}}
									>
										{park.shortDescription}
									</p>
								)}
								{park.amenities.length > 0 && (
									<div
										style={{
											display: 'flex',
											flexWrap: 'wrap',
											gap: '0.375rem',
											marginTop: '0.75rem'
										}}
									>
										{park.amenities.slice(0, 4).map((amenity) => (
											<span
												key={amenity}
												style={{
													display: 'inline-flex',
													alignItems: 'center',
													borderRadius: '9999px',
													padding: '0.125rem 0.5rem',
													fontSize: '0.6875rem',
													border: '1px solid hsl(var(--border))',
													color: 'hsl(var(--foreground))',
													textTransform: 'capitalize'
												}}
											>
												{amenity.replace(/-/g, ' ')}
											</span>
										))}
										{park.amenities.length > 4 && (
											<span
												style={{
													display: 'inline-flex',
													alignItems: 'center',
													borderRadius: '9999px',
													padding: '0.125rem 0.5rem',
													fontSize: '0.6875rem',
													color: 'hsl(var(--muted-foreground))'
												}}
											>
												+{park.amenities.length - 4} more
											</span>
										)}
									</div>
								)}
							</div>
						</a>
					))}
				</div>
			) : (
				<div
					style={{
						textAlign: 'center',
						padding: '3rem 0',
						color: 'hsl(var(--muted-foreground))'
					}}
				>
					<p style={{ fontSize: '1.125rem' }}>No parks or trails match your filters.</p>
					<button
						onClick={() => {
							setSearch('')
							setParkType('')
						}}
						style={{
							marginTop: '1rem',
							padding: '0.5rem 1.5rem',
							borderRadius: 'var(--radius-md)',
							border: '1px solid hsl(var(--border))',
							backgroundColor: 'transparent',
							color: 'hsl(var(--foreground))',
							cursor: 'pointer',
							fontSize: '0.875rem'
						}}
					>
						Clear Filters
					</button>
				</div>
			)}
		</div>
	)
}
