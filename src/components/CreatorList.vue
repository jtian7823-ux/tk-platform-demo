<template>
    <button class="creator-list-btn" @mouseenter="isCreatorListHover = true">
        <img :src="creators[0]?.avatar || '/Image/Creator_01.webp'" :alt="creators[0]?.nickname">
    </button>
    <section class="creator-list" :class="{ hover: isCreatorListHover }" @mouseleave="isCreatorListHover = false">
        <div class="title"><span class="brand">TaiKip</span> Top Creators</div>

        <Swiper ref="swiperRef" :modules="modules" :slides-per-view="1" :slides-per-group="1" :slides-per-group-skip="0"
            :space-between="12" :breakpoints="breakpoints" :navigation="isDesktop" :watch-overflow="true" :loop="false"
            :autoplay="{ delay: 2500, disableOnInteraction: false }" class="creator-swiper" a11y>
            <SwiperSlide v-for="(c, index) in creators" :key="c.id || c.nickname">
                <router-link class="creator-link" :to="`/creator?id=${c.id}`">
                    <div class="member-img">
                        <img :src="c.avatar || c.img || '/Image/Creator_01.webp'" :alt="c.nickname || c.name" />
                        <div class="counter">{{ index + 1 }}</div>
                        <div v-if="c.is_live" class="live-badge">LIVE</div>
                    </div>
                    <div class="member-name">{{ c.nickname || c.name }}</div>
                </router-link>
            </SwiperSlide>
        </Swiper>

        <router-link to="/creator-list" class="see-all-btn">See All <img :src="theme === 'b' ? '/Home/Icon_go_white.webp' : '/Home/Icon_go_green.webp'" alt=""></router-link>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../assets/css/style.css'
import { useCreatorStore } from '../stores/creator'

const theme = inject('theme')
const creatorStore = useCreatorStore()

const modules = [Navigation, Pagination, Autoplay, A11y]

// Fallback 假資料（API 未回來時顯示）
const fallbackCreators = [
    { id: 0, avatar: '/Image/Creator_01.webp', nickname: 'creator-one', is_live: false },
    { id: 0, avatar: '/Image/Creator_02.webp', nickname: 'creator-two', is_live: false },
    { id: 0, avatar: '/Image/Creator_03.webp', nickname: 'creator-three', is_live: false },
    { id: 0, avatar: '/Image/Creator_04.webp', nickname: 'creator-four', is_live: false },
    { id: 0, avatar: '/Image/Creator_05.webp', nickname: 'creator-five', is_live: false },
    { id: 0, avatar: '/Image/Creator_06.webp', nickname: 'creator-six', is_live: false },
]

const creators = computed(() =>
    creatorStore.creatorList.length > 0 ? creatorStore.creatorList : fallbackCreators
)

const breakpoints = {
    0: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
    768: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 20 },
    1024: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 24 },
}

const isCreatorListHover = ref(false)
const isDesktop = ref(window.innerWidth >= 1024)
const swiperRef = ref(null)

const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1024
}

onMounted(async () => {
    window.addEventListener('resize', handleResize)
    // 抓 API 資料
    await creatorStore.fetchCreators({ limit: 10 })
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>