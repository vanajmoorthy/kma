<template>
    <div class="image-gallery">
        <!-- Loading skeleton tiles -->
        <template v-if="props.loading">
            <div v-for="n in 8" :key="'skeleton-' + n" class="image-item skeleton">
                <div class="placeholder-box"></div>
            </div>
        </template>

        <!-- Actual images -->
        <template v-else>
            <div
                v-for="(post, index) in props.images"
                :key="post.uid || (post.title + '-' + index)"
                class="image-item"
            >
                <p class="project-title">{{ post.title }}</p>
                <nuxt-link :to="post.uid">
                    <img 
                        class="grid-img" 
                        :src="post.imageUrl" 
                        :style="{ height: post.height + 'px' }" 
                        alt=""
                        @load="handleImageLoad"
                    >
                </nuxt-link>
            </div>
            <!-- Placeholder tiles for empty spots -->
            <div
                v-for="n in placeholderCount"
                :key="'placeholder-' + n"
                class="image-item placeholder"
            >
                <div class="placeholder-box"></div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['images-loaded'])

const loadedImages = ref(0)
const totalImages = computed(() => props.images.length)

// Calculate how many placeholder tiles we need to fill the grid nicely
// Aim for at least 8-12 items total depending on screen size
const placeholderCount = computed(() => {
    const minItems = 12
    const currentCount = props.images.length
    return Math.max(0, minItems - currentCount)
})

function handleImageLoad() {
    loadedImages.value++
    if (loadedImages.value >= totalImages.value) {
        // All images loaded, emit event to parent
        emit('images-loaded')
    }
}

// Reset loaded count when images change
watch(() => props.images, () => {
    loadedImages.value = 0
}, { deep: true })
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
    padding: 2rem;
    column-gap: 10px;
}

.image-item {
    display: inline-block;
    width: 100%;
    margin-bottom: 5px;
    break-inside: avoid-column;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
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
    transition: transform 0.2s ease-out;
}

.placeholder:hover {
    transform: none;
    cursor: default;
}

.placeholder-box {
    width: 100%;
    padding-top: 70%;
    background-color: #e7ded6;
}

.placeholder .placeholder-box {
    background-color: #e7ded6;
    background-image: repeating-linear-gradient(
        45deg,
        #e7ded6,
        #e7ded6 20px,
        #f0e8e0 20px,
        #f0e8e0 40px
    );
}

.skeleton .placeholder-box {
    animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
    0% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.6;
    }
}

@media screen and (max-width: 880px) {
    .image-gallery {
        column-count: 3;
    }
}

@media (max-width: 768px) {
    .image-gallery {
        column-count: 2;
    }
}

@media screen and (max-width: 450px) {
    .image-gallery {
        column-count: 1;
    }
}
</style>

