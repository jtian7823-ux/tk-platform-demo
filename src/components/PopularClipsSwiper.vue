<template>
    <section class="popular-clips">
        <div class="title-box">
            <h2>Popular Clips</h2>
            <router-link to="/popular-clips">See All <img src="/Home/Icon_go_white.webp" alt=""></router-link>
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
            <SwiperSlide v-for="p in popularclips" :key="p.shortTitle">
                <router-link class="clips-card" :to="p.viedoLink">
                    <router-link class="card-header" to="/creator">
                        <div class="creator-img"><img :src="p.creatorImg" :alt="p.creatorName"></div>
                        <div class="creator-name">{{ p.creatorName }}</div>
                    </router-link>
                    <div class="card-cover">
                        <img :src="p.clipCover" :alt="p.clipTitle">
                        <button class="favorite-btn">
                            <img
                            :src="theme === 'b'
                                ? (p.favorite === '0'
                                    ? '/Home/Icon_favorite_normal_dark.webp'
                                    : '/Home/Icon_favorite_active_dark.webp')
                                : (p.favorite === '0'
                                    ? '/Home/Icon_favorite_normal.webp'
                                    : '/Home/Icon_favorite_active.webp')"
                            alt="favorite"
                            />
                        </button>
                    </div>
                    <div class="card-footer">
                        <div class="clips-title">{{ p.clipTitle }}</div>
                        <div class="video-inner">
                            <div class="video-inner-left">
                                <div class="inner-favorite"><img src="/Home/Icon_favorite_white.webp" alt=""><span class="favorite-num">{{ p.clipFavorite }}</span></div>
                                <div class="inner-view"><img src="/Home/Icon_view_white.webp" alt=""><span class="view-num">{{ p.clipView }}</span></div>
                            </div>
                            <div class="video-inner-right">
                                <img :src="theme === 'b' ? '/Home/Icon_diamond_dark.webp' : '/Home/Icon_diamond.webp'" alt="">
                                <span class="diamond-num">{{ p.clipdiamond }}</span>
                                <span class="money-num">(${{ (p.clipdiamond / 100).toFixed(1) }})</span>
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
import { inject } from 'vue'

const theme = inject('theme')

const modules = [Navigation, Pagination, Autoplay, A11y]

const popularclips = [
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', clipCover: '/Image/Poppular_01.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Poppular_02.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Poppular_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '200', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Poppular_01.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', clipCover: '/Image/Poppular_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Poppular_03.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '1005', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', clipCover: '/Image/Poppular_01.webp', clipTitle: 'clip title test test test', clipFavorite: '582', clipView: '1455', clipdiamond: '1000', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator12', clipCover: '/Image/Poppular_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator35', clipCover: '/Image/Poppular_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1332', clipView: '85', clipdiamond: '200', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator10', clipCover: '/Image/Poppular_01.webp', clipTitle: 'clip title test test test', clipFavorite: '822', clipView: '58', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Poppular_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator09', clipCover: '/Image/Poppular_03.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '585', clipdiamond: '800', favorite: '0' },
]
</script>

