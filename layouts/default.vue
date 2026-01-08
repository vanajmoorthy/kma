<template>
	<div>
		<Nav></Nav>
		<NuxtPage />
	</div>
</template>

<script setup>
useHead({
	script: [
		{
			type: 'application/ld+json',
			children: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'ArchitecturalService',
				'name': 'Kumar Moorthy & Associates',
				'alternateName': ['Kumar Moorthy and Associates', 'KM&A'],
				'description': 'Award winning partnership firm of architects and interior designers based in Delhi. Established in 1990, specializing in residential design, commercial spaces, institutional and hotel design.',
				'url': 'https://kumarmoorthy.com',
				'logo': 'https://kumarmoorthy.com/assets/logo.png',
				'image': 'https://kumarmoorthy.com/assets/logo.png',
				'telephone': ['+91-11-41767501', '+91-11-40044887', '+91-11-40044888'],
				'email': 'office@kumarmoorthy.com',
				'address': {
					'@type': 'PostalAddress',
					'streetAddress': 'C-9, 9250, Vasant Kunj',
					'addressLocality': 'New Delhi',
					'postalCode': '110070',
					'addressCountry': 'IN'
				},
				'geo': {
					'@type': 'GeoCoordinates',
					'latitude': '28.540301',
					'longitude': '77.143367'
				},
				'areaServed': {
					'@type': 'City',
					'name': 'Delhi NCR'
				},
				'priceRange': '$$',
				'founder': [
					{
						'@type': 'Person',
						'name': 'Narayan Moorthy'
					},
					{
						'@type': 'Person',
						'name': 'Mallika Kumar'
					}
				],
				'foundingDate': '1990',
				'award': [
					'IIA National Awards for Excellence 2018',
					'J.K. Architect of the Year Awards 1995 and 1997',
					'Indian Institute of Interior Designers - MK Award 2004 & 2006',
					'Best Office Architecture India - Asia Pacific Property Awards Architecture 2018',
					'Houzz Best of 2022, 2021, 2020, 2019, 2018, 2017, 2016'
				],
				'sameAs': [
					'https://www.instagram.com/kumar.moorthy.architects/',
					'https://www.facebook.com/kumarmoorthyassociates',
					'https://www.houzz.in/professionals/architects-and-building-designers/kumar-moorthy-and-associates-pfvwin-pf~1635884599'
				]
			})
		}
	]
})
</script>
