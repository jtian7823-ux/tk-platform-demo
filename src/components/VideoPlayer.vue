<template>
    <section class="video-page">
        <!-- 影片區 -->
        <div class="video-wrapper">
            <video ref="videoRef" class="video-player" :src="video.videoSrc"
                @loadedmetadata="onLoaded" @timeupdate="onTimeUpdate"></video>
        </div>

        <!-- 播放控制列 -->
        <div class="control-bar">
            <button class="ctrl-btn" @click="togglePlay">
                <img 
                :src="isPlaying 
                    ? '/Logo&Icon/Watch Clips/Icon_stop.webp' 
                    : '/Logo&Icon/Watch Clips/Icon_play.webp'"
                :alt="isPlaying ? 'Pause' : 'Play'" 
                class="ctrl-icon" />
            </button>

            <span class="time-text">
                {{ formatTime(currentTime) }}
            </span>

            <input type="range" class="progress" min="0" :max="duration" step="0.01" v-model.number="currentTime" @input="onSeek" />

            <span class="time-text">
                {{ formatTime(duration) }}
            </span>

            <button class="ctrl-btn" @click="toggleVolumePanel">
                <img :src="volumeIcon" :alt="isMuted || volume === 0 ? 'Muted' : 'Volume'" class="ctrl-icon" />
            </button>

            <div v-if="showVolumeRange" class="volume-wrap">
                <input type="range" class="volume-range" min="0" max="1" step="0.01" v-model.number="volume" @input="onVolumeChange"/>
            </div>

            <button class="ctrl-btn" @click="toggleFullscreen">
                <img class="ctrl-icon" src="/Logo&Icon/Watch Clips/Icon_full_screen.webp" alt="">
            </button>
        </div>

        <slot name="video-meta" :video="video">
            <div class="video-meta">
                <div class="creator-row">
                    <div class="creator-info">
                        <div class="creator-top">
                            <div class="meta-left">
                                <router-link class="creator-name" to="/creator">
                                    <img
                                        class="creator-avatar"
                                        :src="video.creatorImg"
                                        :alt="video.creatorName"
                                    />
                                    {{ video.creatorName }}
                                </router-link>
                                <button class="follow-btn">
                                    <img src="/Logo&Icon/Watch Clips/Icon_follow.webp" alt="">
                                    Follow
                                </button>
                            </div>

                            <div class="meta-right">
                                <div class="meta-item">
                                    <div class="inner-favorite">
                                        <img src="/Home/Icon_favorite_white.webp" alt="">
                                        <span class="favorite-num">{{ video.clipFavorite }}</span>
                                    </div>
                                    <div class="inner-view">
                                        <img src="/Home/Icon_view_white.webp" alt="">
                                        <span class="view-num">{{ video.clipView }}</span>
                                    </div>
                                    <div class="inner-date">
                                        <span class="date-num">{{ video.clipDate }}</span>
                                    </div>
                                </div>
                                <div class="meta-item diamond">
                                    <img src="/Home/Icon_diamond.webp" alt="">
                                    <span class="diamond-num">{{ video.clipDiamond }}</span>
                                    <span class="money-num">
                                        (${{ (Number(video.clipDiamond) / 100).toFixed(1) }})
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p class="video-desc">
                            {{ video.clipTitle }}
                        </p>

                        <div class="tags-row">
                            Hashtag :
                            <span
                                v-for="(tag, index) in video.clipTags"
                                :key="index"
                                class="tag"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </slot>
    </section>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import '../assets/css/style.css'

// 🔹 接收外層傳進來的 video 資料
const props = defineProps({
    video: {
        type: Object,
        required: true,
    },
})

// 讓 template 可以用 clips.xxx
const video = computed(() => props.video)

const videoRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const volume = ref(1)
const previousVolume = ref(1)

const showVolumeRange = ref(false)

const volumeIcon = computed(() => {
    if (isMuted.value || volume.value === 0) {
        return '/Logo&Icon/Watch Clips/Icon_mute.webp'
    }
    return '/Logo&Icon/Watch Clips/Icon_volume.webp'
})

const onLoaded = () => {
    const el = videoRef.value
    if (!el) return

    duration.value = el.duration || 0
    el.volume = volume.value
    el.muted = isMuted.value
}

const onTimeUpdate = () => {
    const el = videoRef.value
    if (!el) return
    currentTime.value = el.currentTime
}

const togglePlay = () => {
    const el = videoRef.value
    if (!el) return

    if (isPlaying.value) {
        el.pause()
    } else {
        el.play()
    }
    isPlaying.value = !isPlaying.value
}

const onSeek = () => {
    const el = videoRef.value
    if (!el) return
    el.currentTime = currentTime.value
}

const onVolumeChange = () => {
    const el = videoRef.value
    if (!el) return

    el.volume = volume.value

    if (volume.value === 0) {
        isMuted.value = true
        el.muted = true
    } else {
        isMuted.value = false
        el.muted = false
        previousVolume.value = volume.value
    }
}

const toggleVolumePanel = () => {
    showVolumeRange.value = !showVolumeRange.value
}

// const toggleMute = () => {
//     const el = videoRef.value
//     if (!el) return

//     showVolumeRange.value = !showVolumeRange.value

//     if (isMuted.value || volume.value === 0) {
//         const restore = previousVolume.value || 0.5
//         isMuted.value = false
//         volume.value = restore
//         el.volume = restore
//         el.muted = false
//     } else {
//         previousVolume.value = volume.value || 0.5
//         isMuted.value = true
//         el.muted = true
//     }
// }

const toggleFullscreen = () => {
    const el = videoRef.value
    if (!el) return

    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        el.requestFullscreen?.()
    }
}

const formatTime = (sec) => {
    const s = Math.floor(sec || 0)
    const m = Math.floor(s / 60)
    const rest = s % 60
    return `${String(m).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
}

watch(currentTime, (val) => {
    const el = videoRef.value
    if (!el) return

    if (Math.abs(el.currentTime - val) > 0.2) {
        el.currentTime = val
    }
})
</script>
