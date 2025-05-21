<template>
    <main>

        <section id="hero">
            <h2>{{ page.data.title[0].text }}</h2>
            <img class="hero-image" :src="page.data.image.url" alt="Project main image">
        </section>
        <div id="modal" v-if="displayModal">
            <div class="close">
                <button @click="displayModal = false"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                        viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                        <path
                            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                        </path>
                    </svg></button>
            </div>
            <div class="image-holder">
                <button id="left" @click="prev"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                        viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                    </svg></button>
                <div class="direct-img-holder">
                    <img :src="image" />
                </div>
                <button id="right" @click="next"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                        viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;">
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                    </svg></button>
            </div>
        </div>
        <div class="details">
            <div class="image-gallery">
                <div v-for="(url, index) in imageUrls" class="image-item">
                    <button @click.stop="displayModall(true, index)">
                        <img :src="url" alt="Project Image">
                    </button>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'; // Assuming you might need onBeforeUnmount if you re-add onClickOutside
import { usePrismic, useRoute, useAsyncData, createError, useSeoMeta } from '#imports'; // Or specific imports

const { client } = usePrismic();
const route = useRoute();

const { data: page } = await useAsyncData(`project-${route.params.uid}`, async () => {
    // It's good practice to make the key for useAsyncData unique, e.g., by including UID
    const document = await client.getByUID("project", route.params.uid);

    if (document) {
        return document;
    } else {
        throw createError({ statusCode: 404, message: "Page not found" });
    }
});

// Graceful handling if page data somehow isn't loaded, though createError should prevent this.
if (!page.value || !page.value.data) {
    // This situation should ideally be handled by the error thrown above.
    // If execution reaches here, it's an unexpected state.
    console.error("Project data is not available after fetch.");
    // You might want to throw an error or set default empty values for prismicDocData and description
    // to prevent further errors, though Nuxt's error page should take over from createError.
}

// Use .value to access Ref data in <script setup>
const prismicDocData = page.value?.data || {}; // Provide a default empty object if data is null/undefined
const description = prismicDocData.description || []; // Default to empty array for Prismic RichText/Title

let imageUrls = [];

// Iterate over all fields in the document's data object
for (const key in prismicDocData) {
    const field = prismicDocData[key];
    // **THE FIX IS HERE:**
    // 1. Check if 'field' (prismicDocData[key]) is truthy (not null, undefined).
    // 2. Check if 'field' is an object (Prismic image fields are objects).
    // 3. Check if 'field.url' is truthy (has a value).
    // 4. Check if 'field.url' is a string.
    if (field && typeof field === 'object' && field.url && typeof field.url === 'string') {
        imageUrls.push(field.url);
    }
}

const images = imageUrls; // This is a non-reactive copy. Fine if imageUrls is populated once.

const index = ref(0); // For modal's current image index
// Safer initialization for 'image' ref, in case 'images' array is empty
const image = ref(images.length > 0 ? images[0] : ''); // The URL for the modal's current image

let displayModal = ref(false);

const displayModall = (isOpen, imageIdx = 0) => { // Renamed param to avoid conflict with 'index' ref
    if (isOpen) {
        if (images.length > 0 && imageIdx >= 0 && imageIdx < images.length) {
            index.value = imageIdx;
            image.value = images[index.value]; // Use the ref 'index.value'
            displayModal.value = true;
        } else {
            console.warn("Cannot display modal: no images available or invalid index provided.");
            displayModal.value = false;
        }
    } else {
        displayModal.value = false;
    }
};

const next = () => {
    if (images.length === 0) return; // Guard clause for empty images array
    index.value = (index.value + 1) % images.length;
    image.value = images[index.value];
};

const prev = () => {
    if (images.length === 0) return; // Guard clause
    index.value = (index.value - 1 + images.length) % images.length;
    image.value = images[index.value];
};

// const onClickOutside = (e) => { // If you re-enable this
//     if (e.target.localName !== "button" && e.target.closest('#modal .direct-img-holder') === null) {
//         displayModal.value = false;
//     }
// };

// onMounted(() => {
//     // window.addEventListener("click", onClickOutside);
// });
// onBeforeUnmount(() => { // Always clean up global event listeners
//     // window.removeEventListener("click", onClickOutside);
// });

// SEO Meta (ensure page.value and page.value.data are checked)
if (page.value && page.value.data) {
    const titleText = page.value.data.title && page.value.data.title[0] ? page.value.data.title[0].text : 'Project';
    // Assuming you might have a specific meta_description field in Prismic.
    const metaDesc = (Array.isArray(page.value.data.description) && page.value.data.description[0]?.text) ?
                     page.value.data.description[0].text.substring(0, 155) : // Simple truncation for example
                     'View project details.';

    useSeoMeta({
        title: titleText,
        ogTitle: titleText,
        description: metaDesc,
        ogDescription: metaDesc,
        ogImage: page.value.data.image && page.value.data.image.url ? page.value.data.image.url : '',
    });
}
</script>


<style scoped>
main {
    background-color: #f1eae2;
}

#hero {
    position: relative;
}


.close>button {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 2rem;
    font-family: "NeueHaas45";
    font-weight: 200;
    position: absolute;
    top: 10px;
    right: 10px;
    transition: 0.2s ease all;
}

.close>button:hover {
    cursor: pointer;
    opacity: 0.7;
}

#modal {
    position: fixed;
    z-index: 2;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.image-holder {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.direct-img-holder>img {
    max-width: 90%;
}

#left,
#right {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 3rem;
    font-family: "NeueHaas45Bold";
    font-weight: 800;
    margin: 1rem;
    transition: 0.2s ease all;
}

#left:hover,
#right:hover {
    cursor: pointer;
    opacity: 0.7;
}

#hero>h2 {
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
}

.description>p {
    margin-bottom: 1rem;
    margin-top: 0.2rem;
    font-family: "NeueHaas45";
    font-size: 1rem;

    text-align: justify;
}

.description>h3 {
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
    transition: all 0.3s ease-in-out;
    /* background-color: white; */
    margin-bottom: 5px;
    position: relative;
}

.image-item>button {
    border: none;
}

.image-item>button>img {
    width: 100%;
    display: block;
    transition: all 0.3s ease-in-out;
}

.image-item:hover {
    transform: scale(1.05);
    cursor: pointer;
}

.image-item>button>img:hover {
    cursor: pointer;

}

.direct-img-holder {
    width: 80vw;
    display: flex;
    justify-content: center;
    
}

@media screen and (max-width: 1040px) {
    .details {
        flex-direction: column-reverse;
    }

    .image-gallery {
        width: 100%;
        max-width: 100%;
    }

    .description {
        margin-left: 0;
    }

    .direct-img-holder>img {
        max-width: 70%;
    }
}

@media screen and (max-width: 580px) {
    .image-gallery {
        column-count: 1;
    }

    .details {
        padding: 2rem;
    }

    #left,
    #right {
        margin: 0rem;
    }

    .direct-img-holder {
        width: 100vw;
    }

    .direct-img-holder>img {
        max-width: 90%;
        border: 1px solid white;
    }
}
</style>
    
