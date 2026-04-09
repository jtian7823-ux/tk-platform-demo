<template>
    <section class="video-section">
        <div class="title-box">
            <h1>{{ title }}</h1>
        </div>

        <div class="video-grid">
            <router-link
                v-for="(c, index) in pagedClips"
                :key="index"
                :to="c.videoLink"
                :class="['clips-card', addClass]"
            >
                <router-link class="card-header" to="/creator">
                    <div class="creator-img">
                        <img :src="c.creatorImg" :alt="c.creatorName" />
                    </div>
                    <div class="creator-name">{{ c.creatorName }}</div>
                </router-link>

                <div class="card-cover">
                    <img :src="c.clipCover" :alt="c.clipTitle">
                    <button class="favorite-btn">
                        <img
                            :src="c.favorite === '0'
                                ? '/Home/Icon_favorite_normal.webp'
                                : '/Home/Icon_favorite_active.webp'"
                            alt="favorite"
                        >
                    </button>
                </div>

                <slot name="card-footer" :clip="c">
                    <div class="card-footer">
                        <div class="clips-title">{{ c.clipTitle }}</div>

                        <div class="video-inner">
                            <div class="video-inner-left">
                                <div class="inner-favorite">
                                    <img src="/Home/Icon_favorite_white.webp" alt="" />
                                    <span class="favorite-num">{{ c.clipFavorite }}</span>
                                </div>
                                <div class="inner-view">
                                    <img src="/Home/Icon_view_white.webp" alt="" />
                                    <span class="view-num">{{ c.clipView }}</span>
                                </div>
                            </div>

                            <div class="video-inner-right">
                                <img src="/Home/Icon_diamond.webp" alt="" />
                                <span class="diamond-num">{{ c.clipdiamond }}</span>
                                <span class="money-num">
                                    (${{ (Number(c.clipdiamond) / 100).toFixed(1) }})
                                </span>
                            </div>
                        </div>
                    </div>
                </slot>
            </router-link>
        </div>

        <div class="pagination-wrap" v-if="totalPages > 1">
            <div class="pagination-bar">
                <button
                    class="pager pager-prev"
                    :class="{ disabled: currentPage === 1 }"
                    :disabled="currentPage === 1"
                    @click="goPrev"
                >
                    ‹ Prev
                </button>

                <button
                    v-for="page in pages"
                    :key="page"
                    class="pager pager-page"
                    :class="{ active: page === currentPage }"
                    @click="goPage(page)"
                >
                    {{ page }}
                </button>

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
import { ref, computed } from 'vue'
import '../assets/css/style.css'

// 這個元件只關心兩件事：標題、這頁要顯示的 clips 資料
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    addClass: { 
        type: String,
        default: '',
    },
    clips: {
        type: Array,
        required: true,
    },
})

const pageSize = 9
const currentPage = ref(1)

const totalPages = computed(
    () => Math.ceil(props.clips.length / pageSize) || 1
)

const pagedClips = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return props.clips.slice(start, start + pageSize)
})

const pages = computed(() =>
    Array.from({ length: totalPages.value }, (_, i) => i + 1)
)

const goPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

const goPrev = () => {
    if (currentPage.value > 1) currentPage.value--
}

const goNext = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}
</script>
