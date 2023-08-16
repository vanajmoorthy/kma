<template>
	<div>
		<div v-for="post in subtypeImages['Urban Residences'] " :key="post.id" class="post">

			<img class="grid-img" :src="post" alt="">
		</div>
	</div>
</template>

<script setup>
const { client } = usePrismic();

const { data: posts } = await useAsyncData("posts", () =>
	client.getAllByType("project")
);

// Assuming your array of JSON objects is named 'posts'
// Define an empty object to store subtypes and their corresponding image URLs
const subtypeImages = {};

// Loop through each post in the 'posts' array

for (const post of posts._rawValue) {
	const subtype = post.data.subtype[0].text; // Get the subtype text
	console.log(subtype)
	const imageUrl = post.data.image.url; // Get the image URL

	// 	// If the subtype doesn't exist in the subtypeImages object, create an empty array
	if (!subtypeImages[subtype]) {
		subtypeImages[subtype] = [];
	}

	// 	// Push the image URL to the appropriate subtype's array
	subtypeImages[subtype].push(imageUrl);
}

// Now you have the subtypeImages object organized by subtypes with arrays of image URLs
console.log(subtypeImages);


</script>

<script>
export default {};
</script>

<style scoped>
.grid-img {
	width: 100px;
}
</style>
