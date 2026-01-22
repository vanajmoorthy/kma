<template>
    <div class="image-gallery">
        <div v-for="post in props.images" :key="post.id" class="image-item">
            <p class="project-title">{{ post.title }}</p>
            <nuxt-link :to="post.uid">
                <img class="grid-img" :src="post.imageUrl" :style="{ height: post.height + 'px' }" alt="">
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    images: Array
})
</script>

<style scoped>
.project-title {
    position: absolute;
    color: white;
    bottom: 0px;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    width: calc(100% - 1rem);
}

.image-gallery {
    column-count: 4;
    margin-top: 0.5rem;
    /* max-width: 90vw; */
    /* margin: auto; */
    /* Number of columns */
    /* No gap between columns */
    padding: 2rem;
    column-gap: 10px;
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

.image-item:hover {
    transform: translateY(-10px);
    cursor: pointer;
}

/* Negative margins to make images touch */
.image-item:not(:first-child) {
    /* margin-top: -5px; */
    /* Adjust this value as needed */
}

/* Add a first-child negative margin to counteract the top margin on the first image */
.image-item:first-child {
    /* margin-top: 0; */
}



@media screen and (max-width: 880px) {
    .image-gallery {
        column-count: 3;
    }
}

@media (max-width: 768px) {
    .image-gallery {
        column-count: 2;
        /* Change the number of columns for smaller screens */
    }
}

@media screen and (max-width: 450px) {
    .image-gallery {
        column-count: 1;
    }
}
</style>

