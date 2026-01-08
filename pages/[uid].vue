<template>
    <main>

        <section id="hero">
            <h2>{{ page.data.title[0].text }}</h2>
            <div id="control">
                <img class="down-arrow" src="@/assets/down.png" alt="down arrow" @click="scrollToDetails" />
            </div>
            <img class="hero-image" :src="page.data.image.url" alt="Project main image">
        </section>
        <div id="modal" v-if="displayModal" :class="{ rotated: isRotated }">
            <div class="modal-content" :class="{ rotated: isRotated }">
                <div class="close">
                    <button @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                            viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);">
                            <path
                                d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                            </path>
                        </svg></button>
                </div>
                <!-- Rotate button - mobile only -->
                <button class="rotate-btn" @click="toggleRotate" :title="isRotated ? 'Exit fullscreen' : 'Rotate to landscape'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);">
                        <!-- Phone/screen rotation icon -->
                        <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.19l6.36-6.36 12.02 12.02-6.36 6.36zm-8.31 1.29C3.27 20.93.93 17.76.57 14H-.93c.51 6.16 5.66 11 11.95 11l.66-.03-3.81-3.81-1.33 1.32z"/>
                    </svg>
                </button>
                <div class="image-holder">
                    <button id="left" @click="prev"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                            viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);">
                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                        </svg></button>
                    <div class="direct-img-holder">
                        <img :src="image" />
                    </div>
                    <button id="right" @click="next"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                            viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);">
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                        </svg></button>
                </div>
            </div>
        </div>
        <div class="details" ref="detailsSection">
            <div class="image-gallery">
                <div v-for="(url, index) in mainGalleryImages" :key="'main-' + index" class="image-item">
                    <button @click.stop="displayModall(true, index)">
                        <img :src="url" alt="Project Image">
                    </button>
                </div>
            </div>
            <div class="sidebar">
                <div class="description">
                    <h3>{{ page.data.title[0].text }}</h3>
                    <p v-for="text in description">{{ text.text }}</p>
                </div>
                <div class="sidebar-images">
                    <div v-for="(url, index) in sidebarImages" :key="'sidebar-' + index" class="image-item">
                        <button @click.stop="displayModall(true, mainGalleryImages.length + index)">
                            <img :src="url" alt="Project Image">
                        </button>
                    </div>
                </div>
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

// Split images: main gallery gets ~2/3, sidebar gets ~1/3 (matching the 2fr 1fr grid ratio)
const sidebarImageCount = Math.max(1, Math.floor(imageUrls.length / 3));
const mainGalleryImages = imageUrls.slice(0, imageUrls.length - sidebarImageCount);
const sidebarImages = imageUrls.slice(imageUrls.length - sidebarImageCount);

const index = ref(0); // For modal's current image index
// Safer initialization for 'image' ref, in case 'images' array is empty
const image = ref(images.length > 0 ? images[0] : ''); // The URL for the modal's current image

let displayModal = ref(false);
const isRotated = ref(false);

const toggleRotate = () => {
    isRotated.value = !isRotated.value;
};

const closeModal = () => {
    displayModal.value = false;
    isRotated.value = false; // Reset rotation when closing
};

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

const detailsSection = ref(null);

const scrollToDetails = () => {
    if (detailsSection.value) {
        const elementPosition = detailsSection.value.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - 64; // 4rem offset for navbar
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
};

// Keyboard event handlers for carousel
const handleKeyDown = (e) => {
    if (!displayModal.value) return;
    
    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            prev();
            break;
        case 'ArrowRight':
            next();
            break;
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

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
    z-index: 10;
    cursor: pointer;
}

.close>button svg {
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8));
}

.close>button:hover {
    opacity: 0.7;
}

#modal {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
}

.modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.4s ease;
}

/* Rotate button - hidden by default, shown on mobile */
.rotate-btn {
    display: none;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: 0.2s ease all;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.rotate-btn:hover {
    opacity: 0.7;
}

/* Rotated state - rotate 90 degrees clockwise for landscape view */
.modal-content.rotated {
    transform: rotate(90deg);
    width: 100vh;
    height: 100vw;
}

.image-holder {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    position: relative;
}

.direct-img-holder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.direct-img-holder>img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

#left,
#right {
    border: none;
    background-color: transparent;
    color: white;
    font-size: 3rem;
    font-family: "NeueHaas45Bold";
    font-weight: 800;
    transition: 0.2s ease all;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 1rem;
    cursor: pointer;
}

#left {
    left: 0.25rem;
}

#right {
    right: 0.25rem;
}

#left svg,
#right svg {
    width: 64px;
    height: 64px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8));
}

#left:hover,
#right:hover {
    opacity: 0.7;
}

#control {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    cursor: pointer;
}

.down-arrow {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 auto;
    transition: 0.2s ease all;
    transform: translateX(0);
}

#control:hover .down-arrow {
    transform: translateY(6px);
}

#hero>h2 {
    position: absolute;
    bottom: 5rem;
    right: 1rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 0.75rem;
    font-size: 2.5rem;
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
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
    padding: 2rem 4rem;
}

.image-gallery {
    column-count: 2;
    column-gap: 10px;
}

.sidebar {
    /* Natural flow: description first, then images */
    display: block;
}

.description {
    margin-bottom: 2rem;
    margin-left: 0.5rem;
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

.sidebar-images .image-item {
    margin-bottom: 5px;
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
    transform: translateY(-10px);
    cursor: pointer;
}

.image-item>button>img:hover {
    cursor: pointer;

}

@media screen and (max-width: 1040px) {
    .details {
        display: flex;
        flex-direction: column;
    }

    .sidebar {
        order: -1;
    }

    .sidebar-images {
        display: none;
    }

    .image-gallery {
        column-count: 2;
    }
}

@media screen and (max-width: 580px) {
    .image-gallery {
        column-count: 1;
    }

    .details {
        padding: 2rem;
    }

    #left {
        left: 0;
    }
    
    #right {
        right: 0;
    }

    #left svg,
    #right svg {
        width: 48px;
        height: 48px;
    }

    /* Show rotate button on mobile */
    .rotate-btn {
        display: block;
    }

    #hero>h2 {
        font-size: 1.8rem;
    }

    .down-arrow {
        width: 2rem;
        height: 2rem;
    }
}
</style>

