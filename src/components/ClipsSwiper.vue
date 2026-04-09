<template>
    <section class="hot-girls">
        <div class="title-box">
            <h2>Clips</h2>
            <router-link to="/clips">See All <img src="/Home/Icon_go_white.webp" alt=""></router-link>
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
import { inject } from 'vue'

const theme = inject('theme')

const modules = [Navigation, Pagination, Autoplay, A11y]

const clips = [
    { viedoLink: '/play?id=1', creatorImg: 'https://i.pravatar.cc/150?img=47', creatorName: 'Namfon 💎', clipCover: 'https://picsum.photos/seed/clip1/320/200', clipTitle: 'เต้นรำยามค่ำคืน Night Dance 🌙', clipFavorite: '18.8K', clipView: '15.8K', clipdiamond: '1200', favorite: '0' },
    { viedoLink: '/play?id=2', creatorImg: 'https://i.pravatar.cc/150?img=44', creatorName: 'Mintra ✨', clipCover: 'https://picsum.photos/seed/clip2/320/200', clipTitle: 'Thai Street Food Tour 🍜', clipFavorite: '8.8K', clipView: '5.8K', clipdiamond: '800', favorite: '1' },
    { viedoLink: '/play?id=3', creatorImg: 'https://i.pravatar.cc/150?img=40', creatorName: 'Praew 🌸', clipCover: 'https://picsum.photos/seed/clip3/320/200', clipTitle: 'สอนเต้น K-Pop Style 💃', clipFavorite: '22.1K', clipView: '18.5K', clipdiamond: '2000', favorite: '0' },
    { viedoLink: '/play?id=4', creatorImg: 'https://i.pravatar.cc/150?img=45', creatorName: 'Yui 🎀', clipCover: 'https://picsum.photos/seed/clip4/320/200', clipTitle: 'Makeup Tutorial Thai Style 💄', clipFavorite: '7.5K', clipView: '6.2K', clipdiamond: '500', favorite: '1' },
    { viedoLink: '/play?id=5', creatorImg: 'https://i.pravatar.cc/150?img=48', creatorName: 'Bow 👑', clipCover: 'https://picsum.photos/seed/clip5/320/200', clipTitle: 'Vlog ชีวิตนักร้อง 🎤', clipFavorite: '13.2K', clipView: '11.7K', clipdiamond: '1500', favorite: '0' },
    { viedoLink: '/play?id=6', creatorImg: 'https://i.pravatar.cc/150?img=41', creatorName: 'Kanya 🌺', clipCover: 'https://picsum.photos/seed/clip6/320/200', clipTitle: 'Fitness Morning Routine 🏋️', clipFavorite: '9.9K', clipView: '8.4K', clipdiamond: '900', favorite: '1' },
    { viedoLink: '/play?id=1', creatorImg: 'https://i.pravatar.cc/150?img=49', creatorName: 'Fah 🦋', clipCover: 'https://picsum.photos/seed/clip7/320/200', clipTitle: 'ท่องเที่ยวภาคเหนือ 🏔️', clipFavorite: '5.9K', clipView: '4.3K', clipdiamond: '600', favorite: '1' },
    { viedoLink: '/play?id=2', creatorImg: 'https://i.pravatar.cc/150?img=43', creatorName: 'Pim 💫', clipCover: 'https://picsum.photos/seed/clip8/320/200', clipTitle: 'ดนตรีจากใจ 🎸', clipFavorite: '11.2K', clipView: '9.5K', clipdiamond: '1100', favorite: '0' },
    { viedoLink: '/play?id=3', creatorImg: 'https://i.pravatar.cc/150?img=46', creatorName: 'Aom 🎵', clipCover: 'https://picsum.photos/seed/clip9/320/200', clipTitle: 'Cooking Thai Desserts 🍮', clipFavorite: '13.3K', clipView: '10.1K', clipdiamond: '700', favorite: '1' },
    { viedoLink: '/play?id=4', creatorImg: 'https://i.pravatar.cc/150?img=42', creatorName: 'Noon 🌟', clipCover: 'https://picsum.photos/seed/clip10/320/200', clipTitle: 'Sunset at Chao Phraya 🌅', clipFavorite: '25.6K', clipView: '21.0K', clipdiamond: '2500', favorite: '0' },
    { viedoLink: '/play?id=5', creatorImg: 'https://i.pravatar.cc/150?img=50', creatorName: 'Joy 🎊', clipCover: 'https://picsum.photos/seed/clip11/320/200', clipTitle: 'Songkran Festival Fun 💦', clipFavorite: '16.2K', clipView: '13.8K', clipdiamond: '1300', favorite: '1' },
    { viedoLink: '/play?id=6', creatorImg: 'https://i.pravatar.cc/150?img=39', creatorName: 'Wan 🌻', clipCover: 'https://picsum.photos/seed/clip12/320/200', clipTitle: 'Golden Temple Vlog ⛩️', clipFavorite: '19.0K', clipView: '16.4K', clipdiamond: '1800', favorite: '0' },
]
</script>

