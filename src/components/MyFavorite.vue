<template>
    <section class="favorite-section">
        <div class="title-box">
            <h1>{{ titleText }}</h1> 
        </div>

        <!-- Tabs -->
        <div class="favorite-tabs">
            <button class="tab-btn" :class="{ active: activeTab === 'favorite' }" @click="changeTab('favorite')">
                My Favorite
            </button>
            <button class="tab-btn" :class="{ active: activeTab === 'history' }" @click="changeTab('history')">
                My History
            </button>
        </div>

        <!-- Cards Grid -->
        <div class="favorite-grid">
            <article v-for="(c, index) in pagedClips" :key="index" class="clips-card">
                <div class="card-header">
                    <div class="creator-img">
                        <img :src="c.creatorImg" :alt="c.creatorName" />
                    </div>
                    <div class="creator-name">{{ c.creatorName }}</div>
                </div>

                <div class="card-cover">
                    <img :src="c.clipCover" :alt="c.clipTitle">
                    <button class="favorite-btn">
                        <img
                            :src="theme === 'b'
                                ? ((c?.favorite ?? '0') === '0'
                                    ? '/Home/Icon_favorite_normal_dark.webp'
                                    : '/Home/Icon_favorite_active_dark.webp')
                                : ((c?.favorite ?? '0') === '0'
                                    ? '/Home/Icon_favorite_normal.webp'
                                    : '/Home/Icon_favorite_active.webp')"
                            alt="favorite"
                        />
                    </button>
                </div>

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
                            <img :src="theme === 'b' ? '/Home/Icon_diamond_dark.webp' : '/Home/Icon_diamond.webp'" alt="" />
                            <span class="diamond-num">{{ c.clipdiamond }}</span>
                            <span class="money-num">
                                (${{ (Number(c.clipdiamond) / 100).toFixed(1) }})
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrap" v-if="totalPages > 1">
            <div class="pagination-bar">
                <button class="pager pager-prev" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1"
                    @click="goPrev">
                    ‹ Prev
                </button>

                <button v-for="page in pages" :key="page" class="pager pager-page" :class="{ active: page === currentPage }"
                    @click="goPage(page)">
                    {{ page }}
                </button>

                <button class="pager pager-next" :class="{ disabled: currentPage === totalPages }"
                    :disabled="currentPage === totalPages" @click="goNext">
                    Next ›
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import '../assets/css/style.css'

const theme = inject('theme')

const activeTab = ref('favorite')

const titleText = computed(() =>
    activeTab.value === 'favorite' ? 'My Favorite' : 'My History'
)

const favoriteClips = [
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '0', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '1005', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '582', clipView: '1455', clipdiamond: '1000', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator12', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator35', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1332', clipView: '85', clipdiamond: '200', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator10', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '822', clipView: '58', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator09', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '585', clipdiamond: '800', favorite: '1' },
]

const historyClips = [
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100', favorite: '0' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '0', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100', favorite: '0' },
]

const pageSize = 9
const currentPage = ref(1)

const currentList = computed(() =>
    activeTab.value === 'favorite' ? favoriteClips : historyClips
)

watch(activeTab, () => {
    currentPage.value = 1
})

const totalPages = computed(
    () => Math.ceil(currentList.value.length / pageSize) || 1
)

const pagedClips = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return currentList.value.slice(start, start + pageSize)
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

const changeTab = (tab) => {
    activeTab.value = tab
}
</script>