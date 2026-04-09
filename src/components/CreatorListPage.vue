<template>
    <section class="creator">
        <div class="title-box">
            <h1>Taikip Top Creators</h1> 
        </div>

        <div class="creator-page">
            <article
                class="creator-page-item"
                v-for="(creator, index) in pagedCreators"
                :key="creator.id || creator.name"
            >
                <router-link class="creator-link" :to="`/creator?id=${creator.id}`">
                    <div class="member-img" style="position:relative;">
                        <img :src="creator.avatar || creator.img || '/Image/Creator_01.webp'" :alt="creator.nickname || creator.name" />
                        <div class="counter" v-if="(currentPage-1)*12 + index < 6">{{ (currentPage-1)*12 + index + 1 }}</div>
                        <div v-if="creator.is_live" class="live-badge">LIVE</div>
                    </div>
                    <div class="member-name">{{ creator.nickname || creator.name }}</div>
                    <div v-if="creator.follower_count" style="font-size:11px;color:var(--tk-text-muted,#5A5470);">
                        {{ (creator.follower_count/1000).toFixed(1) }}K followers
                    </div>
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
import { ref, computed, onMounted } from 'vue'
import '../assets/css/style.css'
import { useCreatorStore } from '../stores/creator'

const creatorStore = useCreatorStore()
const currentPage = ref(1)
const pageSize = 12

const totalPages = computed(() => Math.ceil(creatorStore.creatorList.length / pageSize) || 1)
const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

const pagedCreators = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return creatorStore.creatorList.slice(start, start + pageSize)
})

const goPage = (p) => { if (p >= 1 && p <= totalPages.value) currentPage.value = p }
const goPrev = () => { if (currentPage.value > 1) currentPage.value-- }
const goNext = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

onMounted(async () => {
    if (creatorStore.creatorList.length === 0) await creatorStore.fetchCreators({ limit: 50 })
})
</script>