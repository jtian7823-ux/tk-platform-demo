<template>
    <section class="av-video">
        <div class="title-box">
            <h2>Av</h2>
            <router-link to="/av">See All <img src="/Home/Icon_go_white.webp" alt=""></router-link>
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
            <SwiperSlide v-for="a in avs" :key="a.shortTitle">
                <router-link class="clips-card" :to="a.viedoLink">
                    <div class="card-header">
                        <div class="creator-img"><img :src="a.creatorImg" :alt="a.creatorName"></div>
                        <div class="creator-name">{{ a.creatorName }}</div>
                    </div>
                    <div class="card-cover"><img :src="a.avCover" :alt="a.avTitle"></div>
                    <div class="card-footer">
                        <div class="clips-title">{{ a.avTitle }}</div>
                        <div class="video-inner">
                            <div class="video-inner-left">
                                <div class="inner-view"><img src="/Home/Icon_view.webp" alt=""><span class="view-num">{{ a.avView }}</span></div>
                            </div>
                            <div class="video-inner-right">
                                <span class="diamond-num">{{ a.avUploadDate }}</span>
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

const modules = [Navigation, Pagination, Autoplay, A11y]

const avs = [
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator01', avCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '1585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator02', avCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator08', avCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '85', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator06', avCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '185', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator07', avCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '1515', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator02', avCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '1005', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator05', avCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '1455', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator12', avCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator35', avCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '85', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator10', avCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '58', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator08', avCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator09', avCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
]
</script>

