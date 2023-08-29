<template>
    <main>
        <section id="hero">
            <h2>{{ page.data.title[0].text }}</h2>
            <img class="hero-image" :src="page.data.image.url" alt="">
        </section>
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

console.log(page);
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
</style>