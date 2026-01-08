<template>
	<div class="container">

		<main>
			<h1 id="principals">Principal Architects</h1>
			<section class="partners">
				<div class="partner-one">
					<h2>Narayan Moorthy</h2>
					<img src="../assets/nm1.webp" alt="Narayan Moorthy image">
					<p>Schooling: The Daly College, Indore</p>
					<p>Professional Qualifications: B.Arch. from School of Architecture, Institute of Environmental Design,
						Vallabh Vidyanagar, Gujarat.</p>
				</div>
				<div class="partner-two">
					<h2>Mallika Kumar</h2>
					<img src="../assets/mk1.jpeg" alt="Mallika Kumar image">
					<p>Schooling: The Lawrence School, Sanawar</p>
					<p>Professional Qualifications: B.Arch. from School of Architecture, Institute of Environmental Design,
						Vallabh Vidyanagar, Gujarat.</p>
				</div>
			</section>
			<h1 class="light">
				“light, air & greenery”
			</h1>
			<p>
				These three keywords could be said to be what we strive for in each design, with our attitude to
				encompassing
				a
				respect for the client's brief - both programmatic as well as of the feel desired - but avoiding the merely
				flamboyant or trendy in favour of lasting distinctive design & aesthetic values. Our deep commitment to
				sustainability and climatic logic & aptness wherever possible and relevance to context anchors our approach
				to
				buildings we help create.
			</p>
		</main>
		<section class="about">
			<p>Established in 1990, Kumar Moorthy & Associates is an award winning partnership firm of architects and
				interior
				designers based in Delhi. In the three decades since inception we have undertaken and successfully completed
				a
				wide range of design works in the diverse fields of residential design and interiors, institutional and
				hotel
				design, commercial and office spaces and interiors. The clients for the above include notable industrial
				groups,
				private limited companies, charitable and non government organisations, government agencies and public
				figures
				other than private individuals.
				<br>
				<br>
				The firm has been honoured to receive awards in various categories under the prestigious The I.I.A National
				Awards for Excellence 2018, J.K. Architect of the Year Awards in 1995 and 1997, and the Indian Institute of
				Interior Designers - MK Award 2004 & 2006, Best Office Architecture India - Asia Pacific Property Awards
				Architecture 2018.
			</p>

			<p>We have executed projects in the diverse locations of Delhi N.C.R including Noida, Gurgaon, Manesar & Bawal
				as
				also in other diverse locations in India, ranging from Tier-2 cities to hill and rural locales.
				<br><br>
				Notable projects by the firm span a diverse spectrum of concept, philosophy and materials and include an
				building in the Indo Saracenic heritage campus of a 125 year old public school in Indore and a low cost
				building
				using & exemplifying alternative technology for a rehabilitation centre in West Delhi for an NGO for
				disabled
				persons to an award winning corporate office building embodying environmental concerns, a factory for a
				large
				Indo-Scandanavian lighting brand in Bawal, Haryana other than other corporate office buildings & interiors
				in
				Indore, Gurgaon and NOIDA and a number of significant residential projects including farmhouses.
			</p>
		</section>
	</div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()

useSeoMeta({
	title: 'About Us | Kumar Moorthy & Associates - Principal Architects',
	ogTitle: 'About Us | Kumar Moorthy & Associates - Principal Architects',
	description: 'Learn about Kumar Moorthy & Associates (Kumar Moorthy and Associates), established in 1990. Meet principal architects Narayan Moorthy and Mallika Kumar. Award winning architecture firm in Delhi specializing in residential, commercial, and institutional design.',
	ogDescription: 'Learn about Kumar Moorthy & Associates (Kumar Moorthy and Associates), established in 1990. Meet principal architects Narayan Moorthy and Mallika Kumar.',
	ogImage: `${config.public.siteUrl}/assets/logo.png`,
	ogUrl: `${config.public.siteUrl}${route.path}`,
	keywords: 'Kumar Moorthy & Associates, Kumar Moorthy and Associates, Narayan Moorthy, Mallika Kumar, architects Delhi, about Kumar Moorthy, architecture firm Delhi, principal architects',
})

useHead({
	link: [
		{ rel: 'canonical', href: `${config.public.siteUrl}${route.path}` },
	],
})
</script>

<style scoped>
span {
	color: white;
	background-color: #6cb93c;
	display: flex;
	align-items: center;
	margin-left: 0.5rem;
	padding: 0.5rem;
	border-radius: 8px;
	font-family: "NeueHaas45Bold";
	transition: 0.2s ease all;
}

span:hover {
	opacity: 0.7;
	cursor: pointer;
}

.houzz {
	display: flex;
	align-items: center;
}

.houzz>a {
	text-decoration: none;
}

span>img {
	width: 24px;
	margin-left: 0.5rem;
}

#principals {
	margin-top: 0;
}

.light {
	margin-top: 6rem;
}

.partners {
	display: flex;
	margin-top: 2rem;
}

.partners>div>h2 {
	margin-bottom: 1rem;
}

.partners>div>img {
	margin-bottom: 0.5rem;
}

.partners>div>p {
	text-align: center;
	margin-bottom: 0.5rem;
	font-style: italic;
	font-size: 0.9rem;

}

.partners>div {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin: 1rem;
	max-width: 400px;
}

.partners>div>img {
	width: 200px;
	height: 200px;

	border-radius: 500px;
	object-fit: cover;

}

.container {
	background-color: #b79775;
	color: white;
	min-height: calc(100vh - 4rem);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem;
}

main {
	padding-top: 10rem;
	text-align: center;
}

h1 {
	margin-bottom: 1rem;
}

main>p {
	margin: auto;
	max-width: 800px;
}

.about {
	display: flex;
	margin-top: 4rem;
	padding: 4rem;
	justify-content: center;
}

.about>p {
	width: 40%;
	margin: 0 2rem;
	text-align: justify;
}

@media screen and (max-width: 900px) {

	.about>p {
		width: 50%;
		margin: 0 1rem;

	}

}

@media screen and (max-width: 770px) {
	main {
		padding-top: 10rem;
	}

	.about {
		flex-direction: column;
		padding: 0;
	}

	.about>p {
		width: 100%;
		margin: 0;

	}

	.houzz {
		margin-top: 2rem;
	}

}

@media screen and (max-width: 470px) {
	.partners {
		flex-direction: column;
	}
}
</style>
