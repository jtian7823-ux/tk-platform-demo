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
    { shortCover: '/Image/Shorts_01.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_03.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator03', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_01.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_03.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_01.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator10', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_03.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_01.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator03', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_03.webp', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', shortTitle: 'shorts title test test test, shorts title test test test' },
]
</script>

