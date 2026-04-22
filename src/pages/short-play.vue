<template>
    <div class="page hidden">
        <main class="content">
            <section class="shorts-page">
                <router-link class="back-btn" to="/"><img src="/Home/Icon_back.webp" alt=""></router-link>
                <Swiper direction="vertical" :slides-per-view="1" :space-between="0" :modules="[Mousewheel]"
                    :mousewheel="{ forceToAxis: true, sensitivity: 1 }" class="shorts-swiper" @swiper="onSwiperInit"
                    @slideChange="onSlideChange">
                    <SwiperSlide v-for="(item, index) in videos" :key="item.id">
                        <div class="short-card">
                            <div class="short-inner">
                                <div class="media-wrap">
                                    <video class="short-media" preload="metadata" :src="item.src" playsinline loop autoplay muted
                                        :ref="el => setVideoRef(el, index)"></video>
                                </div>

                                <div class="side-actions">
                                    <button class="side-btn">
                                        <img src="/Logo&Icon/Watch Clips/Icon_like.webp" alt="like" />
                                        <span>{{ item.likes }}</span>
                                    </button>
                                    <button class="side-btn">
                                        <img src="/Logo&Icon/Watch Clips/Icon_favorite.webp" alt="save" />
                                        <span>{{ item.comments }}</span>
                                    </button>
                                    <button class="side-btn">
                                        <img src="/Logo&Icon/Watch Clips/Icon_share.webp" alt="share" />
                                        <span>{{ item.shares }}</span>
                                    </button>

                                    <div class="volume-wrapper">
                                        <button class="side-btn" @click="toggleVolumePanel(index)">
                                            <img :src="globalVolume === 0
                                                ? '/Logo&Icon/Watch Clips/Icon_mute.webp'
                                                : '/Logo&Icon/Watch Clips/Icon_volume.webp'" alt="voice" />
                                        </button>

                                        <div class="volume-slider-wrapper" :class="{ show: showVolumeIndex === index }">
                                            <input type="range" min="0" max="1" step="0.01" class="volume-slider"
                                                :value="globalVolume" @input="onVolumeChange" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="creator-bar">
                                <div class="creator-left">
                                    <div class="creator-avatar">
                                        <img src="/Home/Icon_creator_member.webp" alt="" />
                                        <div class="creator-name">{{ item.author }}</div>
                                        <button class="follow-btn">
                                            <img src="/Logo&Icon/Watch Clips/Icon_follow.webp" alt="" />
                                            Follow
                                        </button>
                                    </div>

                                    <div class="creator-info">
                                        <div class="creator-desc">{{ item.desc }}</div>
                                    </div>
                                </div>

                                <div class="progress-bar" :ref="el => setProgressRef(el, index)"
                                    @click.stop="onSeekClick($event, index)">
                                    <div class="progress-fill" :style="{ width: (progress[index] || 0) + '%' }"></div>

                                    <!-- 圓圈：唯一可拖曳的控制點 -->
                                    <div class="progress-thumb" :style="{ left: (progress[index] || 0) + '%' }"
                                        @mousedown.stop.prevent="onThumbDown($event, index)"
                                        @touchstart.stop.prevent="onThumbDown($event, index)"></div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/mousewheel'

const allVideos = [
    { id: 1, src: '/file_example_MP4_1280_10MG.mp4', author: 'taikip_creator', desc: 'Lorem ipsum…', likes: 123, comments: 8, shares: 3 },
    { id: 2, src: '/file_example_MP4_1280_10MG.mp4', author: 'another_user', desc: 'Second video', likes: 456, comments: 16, shares: 9 },
    { id: 3, src: '/file_example_MP4_1280_10MG.mp4', author: 'cool_girl', desc: 'Third video', likes: 999, comments: 32, shares: 20 },
    { id: 4, src: '/file_example_MP4_1280_10MG.mp4', author: 'creator_four', desc: 'More content', likes: 77, comments: 5, shares: 2 },
    { id: 5, src: '/file_example_MP4_1280_10MG.mp4', author: 'creator_five', desc: 'Last demo', likes: 88, comments: 10, shares: 4 }
]

const videos = ref(allVideos.slice(0, 3))
const loadedCount = ref(3)
const videoEls = ref([])
const progressBars = ref([])
const swiperRef = ref(null)

const globalVolume = ref(1)
const showVolumeIndex = ref(null)
const progress = ref({})
const isSeeking = ref(false)
const seekVideoWasPlaying = ref(false)

/* ===================== Video DOM Ref ===================== */
const setVideoRef = (el, index) => {
    if (!el) return
    videoEls.value[index] = el
    el.volume = globalVolume.value
    el.muted = globalVolume.value === 0

    el.ontimeupdate = () => {
        if (!el.duration || isSeeking.value) return
        progress.value[index] = (el.currentTime / el.duration) * 100
    }

    el.onended = () => {
        progress.value[index] = 0
    }

    el.muted = true
    nextTick(() => {
        el.play().catch(() => { })
    })
}

/* ===================== Progress Bar Ref ===================== */
const setProgressRef = (el, index) => {
    if (!el) return
    progressBars.value[index] = el
}

/* ===================== 播放邏輯 ===================== */
const playOnly = (activeIndex) => {
    videoEls.value.forEach((video, idx) => {
        if (!video) return
        if (idx === activeIndex) {
            video.volume = globalVolume.value
            video.muted = globalVolume.value === 0
            if (!isSeeking.value) video.play().catch(() => { })
        } else {
            video.pause()
            video.currentTime = 0
            video.muted = true
            progress.value[idx] = 0
        }
    })
    showVolumeIndex.value = null
}

/* ===================== Swiper ===================== */
const onSwiperInit = (swiper) => {
    swiperRef.value = swiper
    playOnly(swiper.activeIndex)
}

const onSlideChange = (swiper) => {
    const active = swiper.activeIndex
    playOnly(active)

    if (active === videos.value.length - 1 && loadedCount.value < allVideos.length) {
        videos.value.push(allVideos[loadedCount.value])
        loadedCount.value++
    }
}

/* ===================== 音量 ===================== */
const toggleVolumePanel = (index) => {
    showVolumeIndex.value = showVolumeIndex.value === index ? null : index
}

const onVolumeChange = (event) => {
    const v = Number(event.target.value)
    globalVolume.value = v
    videoEls.value.forEach(video => {
        if (!video) return
        video.volume = v
        video.muted = v === 0
    })
}

/* ===================== 點擊進度條 ===================== */
const onSeekClick = (event, index) => {
    const video = videoEls.value[index]
    const bar = progressBars.value[index]
    if (!video || !video.duration || !bar) return
    const rect = bar.getBoundingClientRect()
    const percent = (event.clientX - rect.left) / rect.width
    video.currentTime = Math.max(0, Math.min(percent, 1)) * video.duration
    progress.value[index] = percent * 100
}

/* ===================== 拖曳圓圈進階版 ===================== */
const onThumbDown = (event, index) => {
    const video = videoEls.value[index]
    if (!video || !video.duration) return

    seekVideoWasPlaying.value = !video.paused
    video.pause()
    isSeeking.value = true
    onThumbMove(event, index) // 拖曳立即更新一次

    // 鎖 Swiper
    if (swiperRef.value) swiperRef.value.allowTouchMove = false

    const move = e => onThumbMove(e, index)
    const up = e => onThumbUp(move, up, index)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    window.addEventListener('touchmove', move)
    window.addEventListener('touchend', up)
}

/* 拖曳中 */
const onThumbMove = (event, index) => {
    if (!isSeeking.value) return
    const video = videoEls.value[index]
    const bar = progressBars.value[index]
    if (!video || !video.duration || !bar) return

    const clientX = event.touches ? event.touches[0].clientX : event.clientX
    const rect = bar.getBoundingClientRect()
    const percent = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1))

    progress.value[index] = percent * 100
    video.currentTime = percent * video.duration
}

/* 放開 */
const onThumbUp = (move, up, index) => {
    const video = videoEls.value[index]
    if (!video) return

    isSeeking.value = false
    if (seekVideoWasPlaying.value) video.play().catch(() => { })

    // 解鎖 Swiper
    if (swiperRef.value) swiperRef.value.allowTouchMove = true

    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
    window.removeEventListener('touchmove', move)
    window.removeEventListener('touchend', up)
}
</script>