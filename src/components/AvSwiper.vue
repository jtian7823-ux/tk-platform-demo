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
    { viedoLink: '/play?id=1', creatorImg: 'https://i.pravatar.cc/150?img=47', creatorName: 'Namfon 💎', avCover: 'https://picsum.photos/seed/av1/320/200', avTitle: 'ความรักในคืนฝนตก 🌧️', avView: '15.8K', avUploadDate: '2025-12-01' },
    { viedoLink: '/play?id=2', creatorImg: 'https://i.pravatar.cc/150?img=44', creatorName: 'Mintra ✨', avCover: 'https://picsum.photos/seed/av2/320/200', avTitle: 'ดวงใจกลางคืน ⭐', avView: '9.2K', avUploadDate: '2025-11-28' },
    { viedoLink: '/play?id=3', creatorImg: 'https://i.pravatar.cc/150?img=40', creatorName: 'Praew 🌸', avCover: 'https://picsum.photos/seed/av3/320/200', avTitle: 'รักแท้ไม่มีขีดจำกัด 💕', avView: '22.1K', avUploadDate: '2025-11-25' },
    { viedoLink: '/play?id=4', creatorImg: 'https://i.pravatar.cc/150?img=45', creatorName: 'Yui 🎀', avCover: 'https://picsum.photos/seed/av4/320/200', avTitle: 'สาวไทยหัวใจแกร่ง 🔥', avView: '7.5K', avUploadDate: '2025-11-22' },
    { viedoLink: '/play?id=5', creatorImg: 'https://i.pravatar.cc/150?img=48', creatorName: 'Bow 👑', avCover: 'https://picsum.photos/seed/av5/320/200', avTitle: 'เสน่ห์ยามค่ำคืน 🌙', avView: '18.3K', avUploadDate: '2025-11-19' },
    { viedoLink: '/play?id=6', creatorImg: 'https://i.pravatar.cc/150?img=41', creatorName: 'Kanya 🌺', avCover: 'https://picsum.photos/seed/av6/320/200', avTitle: 'Thai Beauty Secrets 💆', avView: '11.7K', avUploadDate: '2025-11-17' },
    { viedoLink: '/play?id=1', creatorImg: 'https://i.pravatar.cc/150?img=49', creatorName: 'Fah 🦋', avCover: 'https://picsum.photos/seed/av7/320/200', avTitle: 'ชีวิตสวยงามเสมอ 🌈', avView: '5.9K', avUploadDate: '2025-11-14' },
    { viedoLink: '/play?id=2', creatorImg: 'https://i.pravatar.cc/150?img=43', creatorName: 'Pim 💫', avCover: 'https://picsum.photos/seed/av8/320/200', avTitle: 'Midnight Dream 🌠', avView: '13.4K', avUploadDate: '2025-11-11' },
    { viedoLink: '/play?id=3', creatorImg: 'https://i.pravatar.cc/150?img=46', creatorName: 'Aom 🎵', avCover: 'https://picsum.photos/seed/av9/320/200', avTitle: 'เพลงรักยามดึก 🎶', avView: '8.8K', avUploadDate: '2025-11-08' },
    { viedoLink: '/play?id=4', creatorImg: 'https://i.pravatar.cc/150?img=42', creatorName: 'Noon 🌟', avCover: 'https://picsum.photos/seed/av10/320/200', avTitle: 'สวรรค์บนดิน Paradise 🏝️', avView: '25.6K', avUploadDate: '2025-11-05' },
    { viedoLink: '/play?id=5', creatorImg: 'https://i.pravatar.cc/150?img=50', creatorName: 'Joy 🎊', avCover: 'https://picsum.photos/seed/av11/320/200', avTitle: 'วันที่ฉันรักคุณ 💝', avView: '16.2K', avUploadDate: '2025-11-02' },
    { viedoLink: '/play?id=6', creatorImg: 'https://i.pravatar.cc/150?img=39', creatorName: 'Wan 🌻', avCover: 'https://picsum.photos/seed/av12/320/200', avTitle: 'Golden Hour Vibes ✨', avView: '19.0K', avUploadDate: '2025-10-30' },
]
</script>

