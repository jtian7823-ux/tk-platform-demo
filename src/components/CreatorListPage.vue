<template>
    <section class="creator">
        <div class="title-box">
            <h1>Taikip Top Creators</h1> 
        </div>

        <div class="creator-page">
            <article
                class="creator-page-item"
                v-for="(creator,index) in creators"
                :key="creator.newsTitle"
            >
                <router-link class="creator-link" to="/creator">
                    <div class="member-img">
                        <img :src="creator.img" :alt="creator.name" />
                        <div class="counter" v-if="index <= 5" >{{ index + 1 }}</div>
                    </div>
                    <div class="member-name">{{ creator.name }}</div>
                </router-link>
            </article>
        </div>
        
        <div class="pagination-wrap">
            <div class="pagination-bar">
                <!-- Prev -->
                <button
                    class="pager pager-prev"
                    :class="{ disabled: currentPage === 1 }"
                    :disabled="currentPage === 1"
                    @click="goPrev"
                >
                    ‹ Prev
                </button>

                <!-- pages -->
                <button
                    v-for="page in pages"
                    :key="page"
                    class="pager pager-page"
                    :class="{ active: page === currentPage }"
                    @click="goPage(page)"
                >
                    {{ page }}
                </button>

                <button class="pager pager-page active">1</button>
                <button class="pager pager-page">2</button>
                <button class="pager pager-page">3</button>

                <!-- Next -->
                <button
                    class="pager pager-next"
                    :class="{ disabled: currentPage === totalPages }"
                    :disabled="currentPage === totalPages"
                    @click="goNext"
                >
                    Next ›
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import '../assets/css/style.css'

const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
    modelValue: {
        type: Number,
        default: 1,
    },
})

const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})

const pages = computed(() => {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
})

const goPage = (page) => {
    if (page < 1 || page > props.totalPages) return
    currentPage.value = page
}

const goPrev = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1
    }
}

const goNext = () => {
    if (currentPage.value < props.totalPages) {
        currentPage.value += 1
    }
}

const creators = [
    { img: '/Image/Creator_01.webp', name: 'creator-01' },
    { img: '/Image/Creator_02.webp', name: 'creator-02' },
    { img: '/Image/Creator_03.webp', name: 'creator-03' },
    { img: '/Image/Creator_04.webp', name: 'creator-04' },
    { img: '/Image/Creator_05.webp', name: 'creator-05' },
    { img: '/Image/Creator_06.webp', name: 'creator-06' },
    { img: '/Image/Creator_01.webp', name: 'creator-07' },
    { img: '/Image/Creator_02.webp', name: 'creator-08' },
    { img: '/Image/Creator_03.webp', name: 'creator-09' },
    { img: '/Image/Creator_04.webp', name: 'creator-10' },
    { img: '/Image/Creator_05.webp', name: 'creator-11' },
    { img: '/Image/Creator_06.webp', name: 'creator-12' },
    { img: '/Image/Creator_01.webp', name: 'creator-13' },
    { img: '/Image/Creator_02.webp', name: 'creator-14' },
    { img: '/Image/Creator_03.webp', name: 'creator-15' },
    { img: '/Image/Creator_04.webp', name: 'creator-16' },
    { img: '/Image/Creator_05.webp', name: 'creator-17' },
    { img: '/Image/Creator_06.webp', name: 'creator-18' },
]
</script>