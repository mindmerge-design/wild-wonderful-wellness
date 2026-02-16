import { useMemo, useState } from 'react'

interface SerializedPartner {
	_id: string
	title: string
	slug: string
	shortDescription: string
	logo: string
	logoAlt: string
	mainImage: string
	mainImageAlt: string
	partnerType: string
	hasPassportPickup: boolean
	hasStampStation: boolean
}

interface PartnersFilterProps {
	partners: SerializedPartner[]
}

const PARTNER_TYPES = [
	{ value: '', label: 'All Types' },
	{ value: 'fitness', label: 'Fitness' },
	{ value: 'wellness', label: 'Wellness' },
	{ value: 'recreation', label: 'Recreation' },
	{ value: 'healthcare', label: 'Healthcare' },
	{ value: 'retail', label: 'Retail' },
	{ value: 'other', label: 'Other' }
]

export default function PartnersFilter({ partners }: PartnersFilterProps) {
	const [partnerType, setPartnerType] = useState('')
	const [pickupOnly, setPickupOnly] = useState(false)
	const [stampOnly, setStampOnly] = useState(false)

	const filteredPartners = useMemo(() => {
		return partners.filter((partner) => {
			const matchesType = partnerType === '' || partner.partnerType === partnerType
			const matchesPickup = !pickupOnly || partner.hasPassportPickup
			const matchesStamp = !stampOnly || partner.hasStampStation

			return matchesType && matchesPickup && matchesStamp
		})
	}, [partners, partnerType, pickupOnly, stampOnly])

	return (
		<div>
			{/* Filters */}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					alignItems: 'flex-end',
					marginBottom: '2rem'
				}}
			>
				<div style={{ flex: '0 1 200px' }}>
					<label
						htmlFor="partner-type"
						style={{
							display: 'block',
							fontSize: '0.875rem',
							fontWeight: 500,
							marginBottom: '0.5rem',
							color: 'hsl(var(--foreground))'
						}}
					>
						Partner Type
					</label>
					<select
						id="partner-type"
						value={partnerType}
						onChange={(e) => setPartnerType(e.target.value)}
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
						{PARTNER_TYPES.map((type) => (
							<option key={type.value} value={type.value}>
								{type.label}
							</option>
						))}
					</select>
				</div>

				<label
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
						fontSize: '0.875rem',
						color: 'hsl(var(--foreground))',
						cursor: 'pointer',
						padding: '0.625rem 0'
					}}
				>
					<input
						type="checkbox"
						checked={pickupOnly}
						onChange={(e) => setPickupOnly(e.target.checked)}
						style={{
							width: '1rem',
							height: '1rem',
							accentColor: 'hsl(var(--primary))'
						}}
					/>
					Passport Pickup
				</label>

				<label
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
						fontSize: '0.875rem',
						color: 'hsl(var(--foreground))',
						cursor: 'pointer',
						padding: '0.625rem 0'
					}}
				>
					<input
						type="checkbox"
						checked={stampOnly}
						onChange={(e) => setStampOnly(e.target.checked)}
						style={{
							width: '1rem',
							height: '1rem',
							accentColor: 'hsl(var(--primary))'
						}}
					/>
					Stamp Station
				</label>
			</div>

			{/* Results count */}
			<p
				style={{
					fontSize: '0.875rem',
					color: 'hsl(var(--muted-foreground))',
					marginBottom: '1.5rem'
				}}
			>
				Showing {filteredPartners.length} of {partners.length} partners
			</p>

			{/* Card Grid */}
			{filteredPartners.length > 0 ? (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
						gap: '1.5rem'
					}}
				>
					{filteredPartners.map((partner) => (
						<a
							key={partner._id}
							href={`/partners/${partner.slug}`}
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
							{partner.mainImage && (
								<img
									src={partner.mainImage}
									alt={partner.mainImageAlt}
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
										alignItems: 'center',
										gap: '0.75rem',
										marginBottom: '0.75rem'
									}}
								>
									{partner.logo ? (
										<img
											src={partner.logo}
											alt={partner.logoAlt}
											width={48}
											height={48}
											loading="lazy"
											style={{
												width: '3rem',
												height: '3rem',
												objectFit: 'contain',
												borderRadius: 'var(--radius-sm)',
												flexShrink: 0
											}}
										/>
									) : (
										<div
											style={{
												width: '3rem',
												height: '3rem',
												borderRadius: '9999px',
												backgroundColor: 'hsl(var(--primary) / 0.1)',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												flexShrink: 0
											}}
										>
											<span
												style={{
													fontSize: '1.25rem',
													fontWeight: 700,
													color: 'hsl(var(--primary))'
												}}
											>
												{partner.title.charAt(0)}
											</span>
										</div>
									)}
									<h3
										style={{
											fontSize: '1.125rem',
											fontWeight: 600,
											color: 'hsl(var(--foreground))',
											margin: 0
										}}
									>
										{partner.title}
									</h3>
								</div>

								{partner.shortDescription && (
									<p
										style={{
											fontSize: '0.875rem',
											color: 'hsl(var(--muted-foreground))',
											marginTop: '0.25rem',
											display: '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden'
										}}
									>
										{partner.shortDescription}
									</p>
								)}

								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: '0.375rem',
										marginTop: '0.75rem'
									}}
								>
									{partner.partnerType && (
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
												textTransform: 'capitalize'
											}}
										>
											{partner.partnerType}
										</span>
									)}
									{partner.hasPassportPickup && (
										<span
											style={{
												display: 'inline-flex',
												alignItems: 'center',
												borderRadius: '9999px',
												padding: '0.25rem 0.75rem',
												fontSize: '0.75rem',
												fontWeight: 500,
												backgroundColor: 'hsl(var(--success) / 0.1)',
												color: 'hsl(var(--success))'
											}}
										>
											Pickup
										</span>
									)}
									{partner.hasStampStation && (
										<span
											style={{
												display: 'inline-flex',
												alignItems: 'center',
												borderRadius: '9999px',
												padding: '0.25rem 0.75rem',
												fontSize: '0.75rem',
												fontWeight: 500,
												backgroundColor: 'hsl(var(--info) / 0.1)',
												color: 'hsl(var(--info))'
											}}
										>
											Stamp
										</span>
									)}
								</div>
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
					<p style={{ fontSize: '1.125rem' }}>No partners match your filters.</p>
					<button
						onClick={() => {
							setPartnerType('')
							setPickupOnly(false)
							setStampOnly(false)
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
