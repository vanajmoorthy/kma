<template>
	<main>
		<div class="control">
			<h2>{{ current }}</h2>
			<div class="control-links">
				<a v-for="subtype in subtypes" @click="changeGrid(subtype)"
					:class="['control-link', { active: subtype === current }]">
					{{ subtype }}
				</a>
			</div>
		</div>
		<Grid :images="list" :loading="loading" @images-loaded="handleImagesLoaded" />
	</main>
</template>

<style scoped>
main {
	background-color: #f1eae2;
	height: 100%;
	min-height: 100vh;
}

.grid-img {
	width: 300px;
}

.control {
	padding-top: 10rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.control > h2 {
	text-transform: uppercase;
	font-weight: 600;
	color: #e11616;
}

.active {
	color: #e11616 !important;
	width: max-content;
	margin-bottom: 0.5rem;

}

.control-links {
	margin-top: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.control-link:hover {
	color: #e11616;
	cursor: pointer;
}

.control-link {
	border: none;
	background-color: none;
	width: max-content;
	color: #9b9690;
	margin: 0rem 0.35rem;
	margin-bottom: 0.5rem;

	text-transform: uppercase;
	font-weight: 500;
	font-size: 0.98rem;
	font-stretch: normal;
}

.control-link {
	text-decoration: none;
}

@media screen and (max-width: 650px) {
	.control {
		padding-top: 10rem;
	}
}
</style>

<script setup>
// @ts-nocheck
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig()
const route = useRoute()

useSeoMeta({
	title: 'Projects | Kumar Moorthy & Associates - Architecture Portfolio',
	ogTitle: 'Projects | Kumar Moorthy & Associates - Architecture Portfolio',
	description: 'View the architecture and interior design portfolio of Kumar Moorthy & Associates (Kumar Moorthy and Associates). Award winning residential, commercial, and institutional projects in Delhi NCR and across India.',
	ogDescription: 'View the architecture and interior design portfolio of Kumar Moorthy & Associates. Award winning projects in Delhi NCR and across India.',
	ogImage: `${config.public.siteUrl}/assets/logo.png`,
	ogUrl: `${config.public.siteUrl}${route.path}`,
	keywords: 'Kumar Moorthy & Associates projects, Kumar Moorthy and Associates portfolio, architecture projects Delhi, residential architecture, commercial architecture, interior design projects, KM&A projects',
})

useHead({
	link: [
		{ rel: 'canonical', href: `${config.public.siteUrl}${route.path}` },
	],
})

const { client } = usePrismic();

// Fetch posts and order them by 'project_date' descending.
// Prismic usually puts documents with null/empty values for the ordered field at the end
// when sorting in descending order.
const { data: prismicResponse } = await useAsyncData("posts", () => // Renamed to avoid confusion
	client.getAllByType("project", {
		orderings: {
			field: 'my.project.project_date', // IMPORTANT: Use the correct API ID path for your date field
			direction: 'desc',
		},
	})
);

// The actual array of posts from the Prismic response
// Handle cases where prismicResponse.value might be null or undefined (e.g., fetch error)
const sortedPosts = prismicResponse.value || [];

// Define an empty object to store subtypes and their corresponding image URLs
const subtypeImages = {};
subtypeImages["All Projects"] = [];
const subtypes = ["All Projects"]; // "All Projects" will be first in the filter list

// Loop through each post in the 'sortedPosts' array (which is now ordered by Prismic)
for (const post of sortedPosts) {
	const uid = post.uid;
	const title = post.data.title[0].text;
	const subtype = post.data.subtype; // Get the subtype text
	const imageUrl = post.data.image.url; // Get the image URL
	const height = post.data.image.height;
    // const projectDate = post.data.project_date; // You can access it here if needed for display

	// If the subtype doesn't exist in the subtypeImages object, create an empty array
	if (!subtypeImages[subtype]) {
		subtypeImages[subtype] = [];
	}

	// Add subtype to the list if it's not already there (maintains encounter order for subtypes themselves)
	if (subtype && !subtypes.includes(subtype)) { // Ensure subtype exists before pushing
		subtypes.push(subtype);
	}

	// Push the image URL to the appropriate subtype's array
    if (subtype) { // Ensure subtype exists before pushing to its specific array
	    subtypeImages[subtype].push({ height, imageUrl, title, uid });
    }
	subtypeImages["All Projects"].push({ height, imageUrl, title, uid });
}

// If you want the subtype filter links to be sorted alphabetically (optional):
// subtypes.sort((a, b) => {
//   if (a === "All Projects") return -1; // Keep "All Projects" first
//   if (b === "All Projects") return 1;
//   return a.localeCompare(b);
// });


const list = ref(subtypeImages["All Projects"]);
const current = ref("All Projects");
const loading = ref(true);
const imagesReady = ref(false);

function changeGrid(category) {
	// Brief loading state to prevent flicker when switching categories
	// Images are already in memory, so this is just for smooth transition
	loading.value = true;
	current.value = category;
	imagesReady.value = false;
	
	// Use requestAnimationFrame to ensure DOM update happens, then show content
	requestAnimationFrame(() => {
		list.value = subtypeImages[category] || [];
		// Very brief delay to prevent flicker (50ms is barely noticeable)
		setTimeout(() => {
			loading.value = false;
		}, 50);
	});
}

function handleImagesLoaded() {
	// All images have loaded, safe to show them
	imagesReady.value = true;
}

onMounted(() => {
	// On initial load, wait for images to load before hiding skeleton
	// This prevents layout shift on hard refresh
	// Minimum delay to ensure consistent experience
	setTimeout(() => {
		if (imagesReady.value || list.value.length === 0) {
			// Images already loaded or no images, hide skeleton
			loading.value = false;
		} else {
			// Wait a bit more for images to load
			setTimeout(() => {
				loading.value = false;
			}, 400);
		}
	}, 300);
});
</script>
