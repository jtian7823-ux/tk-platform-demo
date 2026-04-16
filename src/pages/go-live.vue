<template>
    <div class="page">
        <HeaderBar />
        <main class="content go-live-page">

            <div class="page-header">
                <h1>🎥 開始直播</h1>
                <p>Go Live — Creator Dashboard</p>
            </div>

            <!-- Stream Key Section -->
            <div class="section-card" v-if="!isLive">
                <div class="card-title">📡 推流資訊</div>
                <div class="info-row">
                    <div class="info-label">RTMP 伺服器</div>
                    <div class="info-val-wrap">
                        <code class="info-val">rtmp://localhost:1935/live</code>
                        <button class="copy-btn" @click="copy('rtmp://localhost:1935/live')">複製</button>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-label">串流金鑰</div>
                    <div class="info-val-wrap">
                        <code class="info-val">{{ streamKey || '點擊開播取得金鑰' }}</code>
                        <button class="copy-btn" @click="copy(streamKey)" v-if="streamKey">複製</button>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-label">HLS 預覽</div>
                    <div class="info-val-wrap">
                        <code class="info-val small">{{ hlsUrl || '開播後顯示' }}</code>
                    </div>
                </div>

                <div class="obs-guide">
                    <div class="guide-title">🎬 OBS Studio 設定步驟</div>
                    <ol class="guide-steps">
                        <li>開啟 OBS Studio → 設定 → 串流</li>
                        <li>服務選擇「自訂」</li>
                        <li>伺服器填入：<code>rtmp://localhost:1935/live</code></li>
                        <li>串流金鑰填入上方金鑰</li>
                        <li>建議設定：2500 Kbps 影像 + 128 Kbps 音訊 + 30fps</li>
                        <li>點擊「開始串流」後等待 3-5 秒即可在前台看到直播</li>
                    </ol>
                </div>

                <button class="go-live-btn" @click="startLive" :disabled="starting">
                    <span v-if="!starting">🔴 開始直播</span>
                    <span v-else>啟動中...</span>
                </button>
            </div>

            <!-- Live Status Section -->
            <div class="section-card live-active" v-if="isLive">
                <div class="live-indicator">
                    <span class="live-dot"></span>
                    <span class="live-text">LIVE 直播中</span>
                    <span class="viewer-count">👁 {{ viewerCount }} 人觀看</span>
                </div>

                <div class="info-row">
                    <div class="info-label">OBS 伺服器</div>
                    <code class="info-val">rtmp://localhost:1935/live</code>
                </div>
                <div class="info-row">
                    <div class="info-label">串流金鑰</div>
                    <div class="info-val-wrap">
                        <code class="info-val">{{ streamKey }}</code>
                        <button class="copy-btn" @click="copy(streamKey)">複製</button>
                    </div>
                </div>

                <!-- Preview player -->
                <div class="preview-section">
                    <div class="preview-title">📺 直播預覽</div>
                    <video
                        ref="previewVideo"
                        class="preview-video"
                        controls
                        muted
                        playsinline
                    ></video>
                    <button class="preview-btn" @click="loadPreview">載入預覽</button>
                </div>

                <div class="live-stats">
                    <div class="stat-box">
                        <div class="stat-val">{{ Math.floor(liveDuration / 60) }}:{{ String(liveDuration % 60).padStart(2,'0') }}</div>
                        <div class="stat-label">直播時長</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-val">{{ giftCount }}</div>
                        <div class="stat-label">收到禮物</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-val">💎 {{ earnedCoins }}</div>
                        <div class="stat-label">本場收益</div>
                    </div>
                </div>

                <button class="stop-btn" @click="stopLive">⏹ 結束直播</button>
            </div>

            <!-- Room stats -->
            <div class="section-card">
                <div class="card-title">📊 本月數據</div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-num">89</div>
                        <div class="stat-desc">直播場次</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-num">234h</div>
                        <div class="stat-desc">累計時長</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-num">12,480</div>
                        <div class="stat-desc">粉絲數</div>
                    </div>
                    <div class="stat-item gold">
                        <div class="stat-num">NT$ 8,920</div>
                        <div class="stat-desc">可提款金額</div>
                    </div>
                </div>
            </div>

            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeaderBar from '../components/HeaderBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { useAuthStore } from '../stores/auth'
import '../assets/css/style.css'

const authStore = useAuthStore()

const streamKey   = ref('')
const hlsUrl      = ref('')
const isLive      = ref(false)
const starting    = ref(false)
const viewerCount = ref(0)
const liveDuration = ref(0)
const giftCount   = ref(0)
const earnedCoins = ref(0)
const previewVideo = ref(null)

let durationTimer = null

// Default demo room id (in real app, use creator's room id)
const ROOM_ID = 1

onMounted(async () => {
    try {
        const res = await fetch('/api/v2/creator/stream-key', {
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        const data = await res.json()
        streamKey.value = data.data?.stream_key || 'alice_live_2026'
        hlsUrl.value    = data.data?.hls_preview || `http://localhost:8088/hls/${streamKey.value}.m3u8`
    } catch (e) {
        streamKey.value = 'alice_live_2026'
        hlsUrl.value    = 'http://localhost:8088/hls/alice_live_2026.m3u8'
    }
})

onUnmounted(() => {
    if (durationTimer) clearInterval(durationTimer)
})

const startLive = async () => {
    starting.value = true
    try {
        const res = await fetch(`/api/v2/live/rooms/${ROOM_ID}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({ stream_key: streamKey.value }),
        })
        const data = await res.json()
        if (data.code === 0) {
            streamKey.value = data.data.stream_key
            hlsUrl.value    = data.data.hls_url
            isLive.value    = true
            liveDuration.value = 0
            durationTimer = setInterval(() => {
                liveDuration.value++
                // Simulate viewer growth
                viewerCount.value = Math.floor(Math.random() * 50 + 100 + liveDuration.value * 0.5)
            }, 1000)
        }
    } catch (e) {
        alert('開播失敗：' + e.message)
    } finally {
        starting.value = false
    }
}

const stopLive = async () => {
    if (durationTimer) clearInterval(durationTimer)
    try {
        await fetch(`/api/v2/live/rooms/${ROOM_ID}/stop`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${authStore.token}` },
        })
    } catch (e) {}
    isLive.value = false
}

const loadPreview = async () => {
    if (!previewVideo.value) return
    try {
        const Hls = (await import('hls.js')).default
        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(hlsUrl.value)
            hls.attachMedia(previewVideo.value)
        } else if (previewVideo.value.canPlayType('application/vnd.apple.mpegurl')) {
            previewVideo.value.src = hlsUrl.value
        }
    } catch (e) {
        console.error('Preview load failed:', e)
    }
}

const copy = (text) => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
        alert('已複製：' + text)
    })
}
</script>

<style scoped>
.go-live-page { background: var(--tk-black); min-height: 100vh; padding-bottom: 40px; }

.page-header {
    background: linear-gradient(135deg, #16162A, #1A1A3E);
    border-bottom: 1px solid rgba(212,175,55,0.2);
    padding: 32px 20px;
    text-align: center;
}
.page-header h1 { font-size: 28px; font-weight: 800; color: #D4AF37; }
.page-header p { color: #A09880; font-size: 14px; margin-top: 4px; }

.section-card {
    max-width: 640px; margin: 24px auto; padding: 28px 24px;
    background: #16162A; border: 1px solid rgba(212,175,55,0.15);
    border-radius: 16px;
}
.section-card.live-active { border-color: rgba(255,59,48,0.5); }
.card-title { font-size: 16px; font-weight: 700; color: #F0EDE4; margin-bottom: 20px; }

.info-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.info-label { font-size: 13px; color: #A09880; min-width: 80px; }
.info-val-wrap { display: flex; align-items: center; gap: 8px; flex: 1; }
.info-val {
    background: #0A0A12; border: 1px solid rgba(212,175,55,0.2);
    border-radius: 8px; padding: 8px 12px; font-size: 13px; color: #D4AF37;
    font-family: monospace; word-break: break-all; flex: 1;
}
.info-val.small { font-size: 11px; }
.copy-btn {
    background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.3);
    color: #D4AF37; padding: 6px 12px; border-radius: 8px;
    font-size: 12px; cursor: pointer; white-space: nowrap; transition: all 0.2s;
}
.copy-btn:hover { background: rgba(212,175,55,0.3); }

.obs-guide {
    background: rgba(10,10,18,0.8); border-radius: 12px; padding: 20px; margin: 20px 0;
    border-left: 3px solid #D4AF37;
}
.guide-title { font-size: 14px; font-weight: 700; color: #D4AF37; margin-bottom: 12px; }
.guide-steps { padding-left: 20px; }
.guide-steps li { font-size: 13px; color: #A09880; margin-bottom: 8px; line-height: 1.5; }
.guide-steps code { background: rgba(212,175,55,0.1); padding: 1px 6px; border-radius: 4px; color: #FFD700; font-size: 12px; }

.go-live-btn {
    width: 100%; padding: 18px; border: none; border-radius: 14px;
    background: linear-gradient(135deg, #C0392B, #E74C3C);
    color: #fff; font-size: 18px; font-weight: 800; cursor: pointer;
    transition: all 0.2s; margin-top: 8px;
    box-shadow: 0 4px 20px rgba(192,57,43,0.4);
}
.go-live-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(192,57,43,0.6); }
.go-live-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.live-indicator {
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
    padding: 12px 20px; background: rgba(255,59,48,0.1);
    border-radius: 40px; width: fit-content;
}
.live-dot {
    width: 12px; height: 12px; background: #FF3B30; border-radius: 50%;
    animation: live-pulse 1.2s ease-in-out infinite;
    box-shadow: 0 0 8px rgba(255,59,48,0.8);
}
@keyframes live-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.live-text { font-size: 15px; font-weight: 800; color: #FF3B30; }
.viewer-count { font-size: 14px; color: #A09880; margin-left: 8px; }

.preview-section { margin: 20px 0; }
.preview-title { font-size: 14px; color: #D4AF37; margin-bottom: 12px; }
.preview-video {
    width: 100%; border-radius: 12px; background: #0A0A12;
    max-height: 220px; object-fit: contain;
}
.preview-btn {
    background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3);
    color: #D4AF37; padding: 10px 24px; border-radius: 8px;
    font-size: 14px; cursor: pointer; margin-top: 10px; transition: all 0.2s;
}
.preview-btn:hover { background: rgba(212,175,55,0.2); }

.live-stats { display: flex; gap: 16px; margin: 20px 0; }
.stat-box {
    flex: 1; background: #0A0A12; border-radius: 12px; padding: 16px;
    text-align: center; border: 1px solid rgba(212,175,55,0.1);
}
.stat-val { font-size: 20px; font-weight: 800; color: #D4AF37; }
.stat-label { font-size: 11px; color: #5A5470; margin-top: 4px; }

.stop-btn {
    width: 100%; padding: 14px; border: 1px solid rgba(192,57,43,0.5);
    background: transparent; color: #FF6B6B; border-radius: 12px;
    font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s;
}
.stop-btn:hover { background: rgba(192,57,43,0.1); }

.stats-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
.stat-item {
    background: #0A0A12; border-radius: 12px; padding: 20px;
    text-align: center; border: 1px solid rgba(212,175,55,0.1);
}
.stat-item.gold .stat-num { color: #D4AF37; }
.stat-num { font-size: 22px; font-weight: 800; color: #F0EDE4; }
.stat-desc { font-size: 12px; color: #5A5470; margin-top: 6px; }
</style>
