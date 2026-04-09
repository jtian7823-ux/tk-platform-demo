<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <div v-if="videoStore.isLoading" class="loading-screen">
                <div class="loading-spinner"></div>
                <p>กำลังโหลด...</p>
            </div>

            <template v-else-if="currentVideo">
                <!-- Purchase Gate -->
                <div v-if="!isPurchased && currentVideo.coin_price > 0" class="purchase-gate">
                    <div class="purchase-gate-inner">
                        <img :src="currentVideo.cover_image" :alt="currentVideo.title" class="gate-cover" />
                        <div class="gate-content">
                            <h2>{{ currentVideo.title }}</h2>
                            <p class="gate-creator">{{ currentVideo.creator_nickname }}</p>
                            <div class="gate-price">
                                <span class="price-label">ราคา / Price</span>
                                <span class="price-value">💎 {{ currentVideo.coin_price }}</span>
                            </div>
                            <button class="buy-video-btn" @click="handlePurchase">
                                ซื้อและดู / Buy & Watch
                            </button>
                            <p v-if="purchaseError" class="purchase-error">{{ purchaseError }}</p>
                        </div>
                    </div>
                </div>

                <!-- Video Player -->
                <VideoPlayer v-else :video="playerData" :hls-url="currentVideo.hls_url" />

                <!-- Related videos -->
                <VideoList
                    title="Related Clips"
                    add-class="related-clips"
                    :clips="relatedClips"
                />
            </template>

            <div v-else class="not-found">
                <p>ไม่พบวิดีโอ / Video not found</p>
                <router-link to="/">← กลับหน้าหลัก</router-link>
            </div>

            <AppFooter />
        </main>
        <CreatorList />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBar from '../components/HeaderBar.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import VideoList from '../components/VideoList.vue'
import AppFooter from '../components/AppFooter.vue'
import CreatorList from '../components/CreatorList.vue'
import { useVideoStore } from '../stores/video'
import { mockVideos } from '../api/mock-data'

const route = useRoute()
const videoStore = useVideoStore()

const isPurchased = ref(false)
const purchaseError = ref('')

const currentVideo = computed(() => videoStore.currentVideo)

// Convert API video to VideoPlayer format
const playerData = computed(() => {
    if (!currentVideo.value) return null
    return {
        videoSrc: currentVideo.value.hls_url,
        creatorImg: currentVideo.value.creator_avatar || '/Home/Icon_creator_member.webp',
        creatorName: currentVideo.value.creator_nickname || 'Creator',
        creatorFollow: '0',
        clipTitle: currentVideo.value.title,
        clipFavorite: currentVideo.value.like_count?.toLocaleString() || '0',
        clipView: currentVideo.value.view_count?.toLocaleString() || '0',
        clipDate: currentVideo.value.published_at?.substring(0, 10) || '',
        clipDiamond: currentVideo.value.coin_price || '0',
        clipTags: currentVideo.value.tags ? currentVideo.value.tags.split(',') : ['Thailand', 'Live', 'TK'],
        favorite: '0',
    }
})

// Related clips in VideoList format
const relatedClips = computed(() =>
    mockVideos
        .filter(v => v.id !== currentVideo.value?.id)
        .slice(0, 6)
        .map(v => ({
            videoLink: `/play?id=${v.id}`,
            creatorImg: v.creator_avatar,
            creatorName: v.creator_nickname,
            clipCover: v.cover_image,
            clipTitle: v.title,
            clipFavorite: v.like_count?.toLocaleString() || '0',
            clipView: v.view_count?.toLocaleString() || '0',
            clipdiamond: v.coin_price,
            favorite: '0',
        }))
)

async function handlePurchase() {
    purchaseError.value = ''
    try {
        await videoStore.purchaseVideo(currentVideo.value.id)
        isPurchased.value = true
    } catch (e) {
        purchaseError.value = 'ซื้อไม่สำเร็จ / Purchase failed'
    }
}

onMounted(async () => {
    const id = route.query.id || 1
    const video = await videoStore.fetchVideoDetail(id)
    // Free videos are auto-unlocked
    if (video && video.coin_price === 0) isPurchased.value = true
})
</script>

<style scoped>
.loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 16px;
}
.loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(212,175,55,0.2);
    border-top-color: var(--tk-gold, #D4AF37);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.purchase-gate {
    padding: 40px 16px;
    display: flex;
    justify-content: center;
}
.purchase-gate-inner {
    max-width: 520px;
    width: 100%;
    background: var(--tk-card-bg, #16162A);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 16px;
    overflow: hidden;
}
.gate-cover {
    width: 100%;
    height: 220px;
    object-fit: cover;
    filter: blur(4px) brightness(0.6);
}
.gate-content {
    padding: 24px;
    text-align: center;
}
.gate-content h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--tk-text, #F0EDE4);
    margin-bottom: 8px;
}
.gate-creator { color: var(--tk-text-dim, #A09880); margin-bottom: 20px; }
.gate-price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
}
.price-label { color: var(--tk-text-dim, #A09880); font-size: 14px; }
.price-value { font-size: 24px; font-weight: 800; color: var(--tk-gold, #D4AF37); }

.buy-video-btn {
    background: linear-gradient(135deg, #D4AF37, #B8960C);
    color: #0A0A12;
    font-weight: 700;
    font-size: 16px;
    border: none;
    border-radius: 24px;
    padding: 12px 32px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(212,175,55,0.4);
    transition: all 0.2s;
}
.buy-video-btn:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(212,175,55,0.6); }
.purchase-error { color: #FF6B6B; margin-top: 12px; font-size: 14px; }
.not-found {
    text-align: center;
    padding: 60px 16px;
    color: var(--tk-text-dim, #A09880);
}
.not-found a { color: var(--tk-gold, #D4AF37); }
</style>
