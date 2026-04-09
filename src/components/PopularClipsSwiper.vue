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
    { viedoLink: '/play?id=1', creatorImg: 'https://i.pravatar.cc/150?img=47', creatorName: 'Namfon 💎', clipCover: 'https://picsum.photos/seed/pop1/320/200', clipTitle: '🔥 Viral Dance Challenge 2025', clipFavorite: '88.8K', clipView: '215.8K', clipdiamond: '5500', favorite: '0' },
    { viedoLink: '/play?id=2', creatorImg: 'https://i.pravatar.cc/150?img=44', creatorName: 'Mintra ✨', clipCover: 'https://picsum.photos/seed/pop2/320/200', clipTitle: '🥇 No.1 Thai Creator 2025', clipFavorite: '52.3K', clipView: '180.5K', clipdiamond: '9800', favorite: '1' },
    { viedoLink: '/play?id=3', creatorImg: 'https://i.pravatar.cc/150?img=40', creatorName: 'Praew 🌸', clipCover: 'https://picsum.photos/seed/pop3/320/200', clipTitle: '🌟 ถนนสาย TK เต็มไปด้วยดาว', clipFavorite: '71.2K', clipView: '198.0K', clipdiamond: '7200', favorite: '0' },
    { viedoLink: '/play?id=4', creatorImg: 'https://i.pravatar.cc/150?img=45', creatorName: 'Yui 🎀', clipCover: 'https://picsum.photos/seed/pop4/320/200', clipTitle: '💄 Beauty That Breaks the Internet', clipFavorite: '44.5K', clipView: '130.2K', clipdiamond: '4100', favorite: '1' },
    { viedoLink: '/play?id=5', creatorImg: 'https://i.pravatar.cc/150?img=48', creatorName: 'Bow 👑', clipCover: 'https://picsum.photos/seed/pop5/320/200', clipTitle: '🎵 เพลงฮิตประจำปี Top Hit', clipFavorite: '63.4K', clipView: '177.9K', clipdiamond: '8800', favorite: '0' },
    { viedoLink: '/play?id=6', creatorImg: 'https://i.pravatar.cc/150?img=41', creatorName: 'Kanya 🌺', clipCover: 'https://picsum.photos/seed/pop6/320/200', clipTitle: '🏆 Champion Fitness Series', clipFavorite: '39.9K', clipView: '104.4K', clipdiamond: '3600', favorite: '1' },
    { viedoLink: '/play?id=1', creatorImg: 'https://i.pravatar.cc/150?img=49', creatorName: 'Fah 🦋', clipCover: 'https://picsum.photos/seed/pop7/320/200', clipTitle: '🌏 Thailand Most Beautiful Spots', clipFavorite: '55.9K', clipView: '143.3K', clipdiamond: '6000', favorite: '1' },
    { viedoLink: '/play?id=2', creatorImg: 'https://i.pravatar.cc/150?img=43', creatorName: 'Pim 💫', clipCover: 'https://picsum.photos/seed/pop8/320/200', clipTitle: '🎸 Live Concert Rewind', clipFavorite: '41.2K', clipView: '95.5K', clipdiamond: '4500', favorite: '0' },
    { viedoLink: '/play?id=3', creatorImg: 'https://i.pravatar.cc/150?img=46', creatorName: 'Aom 🎵', clipCover: 'https://picsum.photos/seed/pop9/320/200', clipTitle: '🍜 Ultimate Street Food Guide', clipFavorite: '33.3K', clipView: '80.1K', clipdiamond: '2800', favorite: '1' },
    { viedoLink: '/play?id=4', creatorImg: 'https://i.pravatar.cc/150?img=42', creatorName: 'Noon 🌟', clipCover: 'https://picsum.photos/seed/pop10/320/200', clipTitle: '🌅 Golden Hour — Most Watched', clipFavorite: '95.6K', clipView: '341.0K', clipdiamond: '12500', favorite: '0' },
    { viedoLink: '/play?id=5', creatorImg: 'https://i.pravatar.cc/150?img=50', creatorName: 'Joy 🎊', clipCover: 'https://picsum.photos/seed/pop11/320/200', clipTitle: '💦 Songkran 2025 Mega Party', clipFavorite: '76.2K', clipView: '263.8K', clipdiamond: '9300', favorite: '1' },
    { viedoLink: '/play?id=6', creatorImg: 'https://i.pravatar.cc/150?img=39', creatorName: 'Wan 🌻', clipCover: 'https://picsum.photos/seed/pop12/320/200', clipTitle: '⛩️ Sacred Temples of Thailand', clipFavorite: '49.0K', clipView: '126.4K', clipdiamond: '5800', favorite: '0' },
]
</script>

