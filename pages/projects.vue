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
		<Grid :images="list"></Grid>
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
	padding-top: 6rem;
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
</style>

<script setup>
import { ref } from 'vue';

const { client } = usePrismic();

const { data: posts } = await useAsyncData("posts", () =>
	client.getAllByType("project")
);


// Define an empty object to store subtypes and their corresponding image URLs
const subtypeImages = {};
subtypeImages["All Projects"] = [];
const subtypes = ["All Projects"];

// Loop through each post in the 'posts' array
for (const post of posts._rawValue) {
	const uid = post.uid;
	const title = post.data.title[0].text;
	const subtype = post.data.subtype; // Get the subtype text
	const imageUrl = post.data.image.url; // Get the image URL
	const height = post.data.image.height;

	// If the subtype doesn't exist in the subtypeImages object, create an empty array
	if (!subtypeImages[subtype]) {
		subtypeImages[subtype] = [];
	}

	if (!subtypes.includes(subtype)) {
		subtypes.push(subtype);
	}

	// Push the image URL to the appropriate subtype's array
	subtypeImages[subtype].push({ height, imageUrl, title, uid });
	subtypeImages["All Projects"].push({ height, imageUrl, title, uid });

}

// Now you have the subtypeImages object organized by subtypes with arrays of image URLs

const list = ref(subtypeImages["All Projects"]);
const current = ref("All Projects");


function changeGrid(category) {
	list.value = subtypeImages[category];
	current.value = category;
}
</script>


