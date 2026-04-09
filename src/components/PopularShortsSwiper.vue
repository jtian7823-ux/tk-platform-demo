<template>
    <section class="popular-shorts">
        <div class="title-box">
            <h2>Popular Shorts</h2>
            <router-link to="/short-play">See All <img src="/Home/Icon_go_white.webp" alt=""></router-link>
        </div>
        
        <Swiper
            :modules="modules"
            :space-between="16"
            :loop="true"
            :slides-per-view="'auto'"
            :free-mode="true"
            class="creator-swiper"
            a11y
        >
            <SwiperSlide v-for="s in shorts" :key="s.shortTitle">
                <router-link class="shorts-link" to="/short-play">
                    <div class="short-img">
                        <img :src="s.shortCover" :alt="s.shortTitle" />
                        <router-link class="creator-inner" to="/creator"><img :src="s.creatorImg" :alt="s.creatorName">{{ s.creatorName }}</router-link>
                        <div class="short-title">{{ s.shortTitle }}</div>
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

const modules = [Navigation, Pagination, Autoplay, A11y]

const shorts = [
    { shortCover: 'https://picsum.photos/seed/sh1/200/360', creatorImg: 'https://i.pravatar.cc/150?img=47', creatorName: 'Namfon 💎', shortTitle: '🌙 กลางคืนที่สวยงาม Beautiful Night' },
    { shortCover: 'https://picsum.photos/seed/sh2/200/360', creatorImg: 'https://i.pravatar.cc/150?img=44', creatorName: 'Mintra ✨', shortTitle: '🍜 Street Food Bangkok Tour' },
    { shortCover: 'https://picsum.photos/seed/sh3/200/360', creatorImg: 'https://i.pravatar.cc/150?img=40', creatorName: 'Praew 🌸', shortTitle: '💃 สอนเต้น K-Pop Choreo' },
    { shortCover: 'https://picsum.photos/seed/sh4/200/360', creatorImg: 'https://i.pravatar.cc/150?img=45', creatorName: 'Yui 🎀', shortTitle: '💄 5-Min Makeup Challenge' },
    { shortCover: 'https://picsum.photos/seed/sh5/200/360', creatorImg: 'https://i.pravatar.cc/150?img=48', creatorName: 'Bow 👑', shortTitle: '🎤 Live Acoustic Session' },
    { shortCover: 'https://picsum.photos/seed/sh6/200/360', creatorImg: 'https://i.pravatar.cc/150?img=41', creatorName: 'Kanya 🌺', shortTitle: '🏋️ 10-Min Burn Workout' },
    { shortCover: 'https://picsum.photos/seed/sh7/200/360', creatorImg: 'https://i.pravatar.cc/150?img=49', creatorName: 'Fah 🦋', shortTitle: '🏔️ Doi Inthanon Vlog' },
    { shortCover: 'https://picsum.photos/seed/sh8/200/360', creatorImg: 'https://i.pravatar.cc/150?img=43', creatorName: 'Pim 💫', shortTitle: '🎸 Guitar Cover Thai Pop' },
    { shortCover: 'https://picsum.photos/seed/sh9/200/360', creatorImg: 'https://i.pravatar.cc/150?img=46', creatorName: 'Aom 🎵', shortTitle: '🍮 Mango Sticky Rice ASMR' },
    { shortCover: 'https://picsum.photos/seed/sh10/200/360', creatorImg: 'https://i.pravatar.cc/150?img=42', creatorName: 'Noon 🌟', shortTitle: '🌅 Chao Phraya Sunset' },
    { shortCover: 'https://picsum.photos/seed/sh11/200/360', creatorImg: 'https://i.pravatar.cc/150?img=50', creatorName: 'Joy 🎊', shortTitle: '💦 Songkran Splash Party' },
    { shortCover: 'https://picsum.photos/seed/sh12/200/360', creatorImg: 'https://i.pravatar.cc/150?img=39', creatorName: 'Wan 🌻', shortTitle: '⛩️ Temple Morning Ritual' },
]
</script>

