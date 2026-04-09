<template>
    <section class="hot-girls">
        <div class="title-box">
            <h2>Hot Girls</h2>
            <router-link to="/hot-girls">See All <img src="/Home/Icon_go_white.webp" alt=""></router-link>
        </div>

        <Swiper
            :modules="modules"
            :space-between="16"
            :loop="true"
            :autoplay="{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }"
            :slides-per-view="'auto'"
            :free-mode="true"
            class="creator-swiper"
            a11y
        >
            <SwiperSlide v-for="c in clips" :key="c.shortTitle">
                <router-link class="clips-card" :to="c.viedoLink">
                    <router-link class="card-header" to="/creator">
                        <div class="creator-img"><img :src="c.creatorImg" :alt="c.creatorName"></div>
                        <div class="creator-name">{{ c.creatorName }}</div>
                    </router-link>
                    <div class="card-cover">
                        <img :src="c.clipCover" :alt="c.clipTitle">
                        <button class="favorite-btn">
                            <img
                            :src="theme === 'b'
                                ? (c.favorite === '0'
                                    ? '/Home/Icon_favorite_normal_dark.webp'
                                    : '/Home/Icon_favorite_active_dark.webp')
                                : (c.favorite === '0'
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
                                <div class="inner-favorite"><img src="/Home/Icon_favorite_white.webp" alt=""><span class="favorite-num">{{ c.clipFavorite }}</span></div>
                                <div class="inner-view"><img src="/Home/Icon_view_white.webp" alt=""><span class="view-num">{{ c.clipView }}</span></div>
                            </div>
                            <div class="video-inner-right">
                                <img :src="theme === 'b' ? '/Home/Icon_diamond_dark.webp' : '/Home/Icon_diamond.webp'" alt="">
                                <span class="diamond-num">{{ c.clipdiamond }}</span>
                                <span class="money-num">(${{ (c.clipdiamond / 100).toFixed(1) }})</span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../assets/css/style.css'
import { inject, ref, computed, onMounted } from 'vue'
import { useCreatorStore } from '../stores/creator'

const theme = inject('theme')
const creatorStore = useCreatorStore()
const modules = [Navigation, Pagination, Autoplay, A11y]

// Adapter: API creator → swiper card format
const clips = computed(() => {
    if (creatorStore.creatorList.length > 0) {
        return creatorStore.creatorList.map(c => ({
            viedoLink: `/creator?id=${c.id}`,
            creatorImg: c.avatar || '/Home/Icon_creator_member.webp',
            creatorName: c.nickname,
            clipCover: c.cover_image || '/Image/Hot_01.webp',
            clipTitle: c.bio || c.nickname,
            clipFavorite: c.follower_count?.toLocaleString() || '0',
            clipView: c.is_live ? c.viewer_count?.toLocaleString() || '0' : '0',
            clipdiamond: '0',
            favorite: '0',
        }))
    }
    // Fallback hardcode
    return [
        { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100', favorite: '0' },
        { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100', favorite: '1' },
        { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '00', favorite: '0' },
        { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100', favorite: '0' },
        { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900', favorite: '0' },
        { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator12', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '1' },
    ]
})

onMounted(async () => {
    if (creatorStore.creatorList.length === 0) {
        await creatorStore.fetchCreators({ limit: 12 })
    }
})
</script>

