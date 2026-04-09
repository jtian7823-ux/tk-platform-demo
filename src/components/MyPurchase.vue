<template>
    <section class="favorite-section">
        <div class="title-box">
            <h1>My Purchase</h1>
        </div>

        <!-- Cards Grid -->
        <div class="favorite-grid">
            <!-- 這裡改：purchaseClips -> pagedClips -->
            <article
                v-for="(c, index) in pagedClips"
                :key="index"
                class="clips-card"
            >
                <div class="card-header">
                    <div class="creator-img">
                        <img :src="c.creatorImg" :alt="c.creatorName" />
                    </div>
                    <div class="creator-name">{{ c.creatorName }}</div>
                </div>

                <div class="card-cover">
                    <img :src="c.clipCover" :alt="c.clipTitle" />
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
import { ref, computed, inject } from 'vue'
import '../assets/css/style.css'

const theme = inject('theme')

const purchaseClips = [
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '0' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '1005', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '582', clipView: '1455', clipdiamond: '1000' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator12', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator35', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1332', clipView: '85', clipdiamond: '200' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator10', clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '822', clipView: '58', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator09', clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '585', clipdiamond: '800' },
]

const pageSize = 9
const currentPage = ref(1)

// 總頁數
const totalPages = computed(
    () => Math.ceil(purchaseClips.length / pageSize) || 1
)

// 當前頁要顯示的資料
const pagedClips = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return purchaseClips.slice(start, start + pageSize)
})

// 分頁按鈕列表
const pages = computed(() =>
    Array.from({ length: totalPages.value }, (_, i) => i + 1)
)

// 跳到指定頁
const goPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

// 上一頁
const goPrev = () => {
    if (currentPage.value > 1) currentPage.value--
}

// 下一頁
const goNext = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}
</script>
