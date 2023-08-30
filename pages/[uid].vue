<template>
    <main>
        <section id="hero">
            <h2>{{ page.data.title[0].text }}</h2>
            <img class="hero-image" :src="page.data.image.url" alt="Project main image">
        </section>
        <div class="details">
            <div class="image-gallery">
                <div v-for="url in imageUrls" class="image-item">
                    <img :src="url" alt="Project Image">
                </div>
            </div>
            <div class="description">
                <h3>{{ page.data.title[0].text }}</h3>
                <p v-for="text in description">{{ text.text }}</p>
            </div>
        </div>

    </main>
</template>

<script setup>
const { client } = usePrismic();
const route = useRoute();

const { data: page } = await useAsyncData("project", async () => {
    const document = await client.getByUID("project", route.params.uid);

    if (document) {
        return document;
    } else {
        throw createError({ statusCode: 404, message: "Page not found" });
    }

});

let data = page._rawValue.data;
let description = page._rawValue.data.description;

let imageUrls = [];

for (const key in data) {
    if (data[key].url) {
        imageUrls.push(data[key].url);
    }
}

</script>

<style scoped>
main {
    background-color: #f1eae2;
}

#hero {
    position: relative;
}

#hero > h2 {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 0.75rem;
    font-size: 1.2rem;
    font-weight: 200;
    z-index: 1;
}

.hero-image {
    width: 100%;
    max-height: 100vh;
    object-fit: cover;
    filter: brightness(130%);
}


.details {
    display: flex;
    padding: 2rem 4rem;
}

.description {
    margin-left: 1rem;
    text-align: justify;
}

.description > p {
    margin-bottom: 1rem;
    margin-top: 0.2rem;
    font-family: "NeueHaas45";
    font-size: 1rem;
}

.description > h3 {
    border-bottom: 1.5px solid black;
    margin-bottom: 1rem;
}

.image-gallery {
    column-count: 2;
    margin-top: 0.5rem;
    /* width: 100%; */
    /* max-width: 90vw; */
    /* margin: auto; */
    /* Number of columns */
    /* No gap between columns */
    /* padding: 2rem; */
    column-gap: 10px;
    margin-right: 1rem;
    max-width: 65vw;
    /* width: 20000%; */
}


.image-item {
    display: inline-block;
    width: 100%;
    margin-bottom: 0;
    break-inside: avoid-column;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    /* background-color: white; */
    margin-bottom: 5px;
    position: relative;
}

.image-item img {
    width: 100%;
    display: block;
    transition: opacity 0.3s ease-in-out;
}
</style>