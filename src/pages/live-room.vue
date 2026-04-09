<template>
    <div class="page live-page">
        <HeaderBar />
        <main class="live-main">
            <div class="live-layout">
                <!-- Left: Video Player -->
                <div class="live-player-col">
                    <div class="live-player-wrap">
                        <video ref="videoRef" class="live-video" autoplay muted playsinline></video>
                        <div class="live-overlay-top">
                            <div class="live-info">
                                <img :src="room?.creator_avatar" class="live-avatar" />
                                <div>
                                    <div class="live-creator-name">{{ room?.creator_nickname }}</div>
                                    <div class="live-title">{{ room?.title }}</div>
                                </div>
                                <button class="follow-live-btn">+ Follow</button>
                            </div>
                            <div class="live-stats">
                                <span class="live-badge-dot">🔴 LIVE</span>
                                <span class="viewer-count">👁 {{ room?.viewer_count?.toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Gift bar -->
                    <div class="gift-bar">
                        <div class="gift-bar-title">ส่งของขวัญ / Send Gift</div>
                        <div class="gift-list">
                            <button
                                v-for="gift in gifts"
                                :key="gift.id"
                                class="gift-btn"
                                :class="{ selected: selectedGift?.id === gift.id }"
                                @click="selectGift(gift)"
                            >
                                <span class="gift-icon">{{ gift.icon }}</span>
                                <span class="gift-name">{{ gift.name }}</span>
                                <span class="gift-cost">💎{{ gift.coin_cost }}</span>
                            </button>
                        </div>
                        <button
                            v-if="selectedGift"
                            class="send-gift-btn"
                            @click="handleSendGift"
                        >
                            ส่ง {{ selectedGift.icon }} {{ selectedGift.name }} (💎{{ selectedGift.coin_cost }})
                        </button>
                        <div v-if="giftAnimation" class="gift-fly-animation">
                            {{ giftAnimation.icon }} ×{{ giftAnimation.qty }}
                        </div>
                    </div>
                </div>

                <!-- Right: Chat -->
                <div class="live-chat-col">
                    <div class="chat-header">
                        <span>💬 Live Chat</span>
                        <span class="chat-viewer">{{ room?.viewer_count }} watching</span>
                    </div>

                    <div class="chat-messages" ref="chatBox">
                        <div
                            v-for="msg in chatMessages"
                            :key="msg.id"
                            class="chat-msg"
                            :class="{ 'chat-msg--gift': msg.message_type === 3 }"
                        >
                            <span class="chat-avatar">
                                <img :src="msg.avatar || `https://i.pravatar.cc/24?u=${msg.member_id}`" />
                            </span>
                            <span class="chat-nick">{{ msg.nickname }}</span>
                            <span class="chat-text">{{ msg.message }}</span>
                        </div>
                    </div>

                    <div class="chat-input-wrap">
                        <input
                            v-model="chatInput"
                            class="chat-input"
                            placeholder="พิมพ์ข้อความ... / Type a message..."
                            @keyup.enter="sendChat"
                        />
                        <button class="chat-send-btn" @click="sendChat">ส่ง</button>
                    </div>
                </div>
            </div>

            <!-- More live rooms -->
            <div class="more-lives">
                <div class="section-header">
                    <h3>🔴 ห้องถ่ายทอดสด / More Live Rooms</h3>
                </div>
                <div class="live-room-grid">
                    <router-link
                        v-for="r in otherRooms"
                        :key="r.id"
                        :to="`/live-room?id=${r.id}`"
                        class="live-room-card"
                    >
                        <div class="live-card-thumb">
                            <img :src="r.cover_image" :alt="r.title" />
                            <span class="live-card-badge">🔴 LIVE</span>
                            <span class="live-card-viewers">👁 {{ r.viewer_count }}</span>
                        </div>
                        <div class="live-card-info">
                            <img :src="r.creator_avatar" class="live-card-avatar" />
                            <div>
                                <div class="live-card-title">{{ r.title }}</div>
                                <div class="live-card-creator">{{ r.creator_nickname }}</div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Hls from 'hls.js'
import HeaderBar from '../components/HeaderBar.vue'
import { useLiveStore } from '../stores/live'
import { mockGifts, mockLiveRooms } from '../api/mock-data'

const route = useRoute()
const liveStore = useLiveStore()

const videoRef = ref(null)
const chatBox = ref(null)
const chatInput = ref('')
const selectedGift = ref(null)
const giftAnimation = ref(null)
let hlsInstance = null
let pollInterval = null

const room = computed(() => liveStore.currentRoom)
const chatMessages = computed(() => liveStore.chatMessages)
const gifts = mockGifts
const otherRooms = computed(() =>
    mockLiveRooms.filter(r => r.id !== parseInt(route.query.id || 1))
)

function selectGift(gift) {
    selectedGift.value = selectedGift.value?.id === gift.id ? null : gift
}

async function handleSendGift() {
    if (!selectedGift.value) return
    await liveStore.sendGift(room.value?.id, selectedGift.value.id, selectedGift.value.coin_cost)
    // Show animation
    giftAnimation.value = { icon: selectedGift.value.icon, qty: 1 }
    // Add to chat
    liveStore.chatMessages.push({
        id: Date.now(),
        member_id: 99,
        nickname: 'Demo 用戶',
        message: `送出 ${selectedGift.value.icon} ${selectedGift.value.name} ×1`,
        message_type: 3,
        created_at: new Date().toISOString(),
    })
    setTimeout(() => { giftAnimation.value = null }, 2500)
    selectedGift.value = null
    scrollChat()
}

async function sendChat() {
    if (!chatInput.value.trim()) return
    const msg = chatInput.value.trim()
    chatInput.value = ''
    await liveStore.sendChat(room.value?.id || 1, msg)
    scrollChat()
}

function scrollChat() {
    nextTick(() => {
        if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight
    })
}

function setupHls(url) {
    const el = videoRef.value
    if (!el || !url) return
    if (Hls.isSupported()) {
        hlsInstance = new Hls({ lowLatencyMode: true })
        hlsInstance.loadSource(url)
        hlsInstance.attachMedia(el)
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => el.play().catch(() => {}))
    } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
        el.src = url
        el.play().catch(() => {})
    }
}

// Simulate new chat messages
function startChatSimulation() {
    const fakeMessages = [
        { nickname: 'สมชาย', text: 'สวัสดีครับ 🙏' },
        { nickname: 'Alice_fan', text: '❤️❤️❤️' },
        { nickname: 'THuser99', text: 'ชอบมากเลย!' },
        { nickname: 'Demo', text: 'Love from Thailand 🇹🇭' },
        { nickname: 'viewer123', text: '💎💎💎' },
    ]
    let i = 0
    pollInterval = setInterval(() => {
        const m = fakeMessages[i % fakeMessages.length]
        liveStore.chatMessages.push({
            id: Date.now() + i,
            member_id: i,
            nickname: m.nickname,
            avatar: `https://i.pravatar.cc/24?u=${i}`,
            message: m.text,
            message_type: 1,
            created_at: new Date().toISOString(),
        })
        if (liveStore.chatMessages.length > 100) liveStore.chatMessages.splice(0, 20)
        scrollChat()
        i++
    }, 3000)
}

onMounted(async () => {
    const id = route.query.id || 1
    await liveStore.fetchRoomDetail(id)
    if (room.value?.hls_url) setupHls(room.value.hls_url)
    scrollChat()
    startChatSimulation()
})

onUnmounted(() => {
    if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null }
    if (pollInterval) clearInterval(pollInterval)
})
</script>

<style scoped>
.live-page { background: var(--tk-black, #0A0A12); }
.live-main { padding-top: 80px; padding-bottom: 40px; }

.live-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
}
@media (max-width: 900px) {
    .live-layout { grid-template-columns: 1fr; }
}

/* Player */
.live-player-wrap {
    position: relative;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 16/9;
}
.live-video { width: 100%; height: 100%; object-fit: cover; }

.live-overlay-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    padding: 12px;
    background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.live-info { display: flex; align-items: center; gap: 10px; }
.live-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid var(--tk-gold, #D4AF37);
}
.live-creator-name { font-weight: 700; color: #fff; font-size: 14px; }
.live-title { font-size: 12px; color: rgba(255,255,255,0.8); }
.follow-live-btn {
    background: var(--tk-gold, #D4AF37);
    color: #0A0A12;
    border: none;
    border-radius: 16px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
}
.live-stats { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.live-badge-dot {
    background: rgba(255,59,48,0.9);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 8px;
    animation: live-pulse 1.8s ease-in-out infinite;
}
.viewer-count { color: rgba(255,255,255,0.8); font-size: 12px; }
@keyframes live-pulse {
    0%, 100% { box-shadow: 0 0 4px rgba(255,59,48,0.6); }
    50% { box-shadow: 0 0 12px rgba(255,59,48,0.9); }
}

/* Gift bar */
.gift-bar {
    margin-top: 12px;
    background: var(--tk-card-bg, #16162A);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 12px;
    padding: 12px;
}
.gift-bar-title { font-size: 13px; color: var(--tk-gold, #D4AF37); font-weight: 600; margin-bottom: 10px; }
.gift-list { display: flex; flex-wrap: wrap; gap: 8px; }
.gift-btn {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    background: var(--tk-black3, #1A1A2E);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 10px;
    padding: 8px 10px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 60px;
}
.gift-btn:hover, .gift-btn.selected {
    border-color: var(--tk-gold, #D4AF37);
    background: rgba(212,175,55,0.1);
    box-shadow: 0 0 12px rgba(212,175,55,0.3);
}
.gift-icon { font-size: 22px; }
.gift-name { font-size: 10px; color: var(--tk-text-dim, #A09880); }
.gift-cost { font-size: 10px; color: var(--tk-gold, #D4AF37); font-weight: 600; }

.send-gift-btn {
    margin-top: 10px;
    width: 100%;
    background: linear-gradient(135deg, var(--tk-gold, #D4AF37), #B8960C);
    color: #0A0A12;
    font-weight: 700;
    border: none;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}
.send-gift-btn:hover { transform: translateY(-1px); box-shadow: 0 0 20px rgba(212,175,55,0.5); }

.gift-fly-animation {
    position: fixed;
    bottom: 30%;
    right: 380px;
    font-size: 48px;
    font-weight: 900;
    color: var(--tk-gold, #D4AF37);
    text-shadow: 0 0 20px rgba(212,175,55,0.8);
    animation: gift-fly 2.5s ease-out forwards;
    pointer-events: none;
    z-index: 9999;
}
@keyframes gift-fly {
    0%   { transform: scale(1) translateY(0); opacity: 1; }
    60%  { transform: scale(1.8) translateY(-60px); opacity: 0.9; }
    100% { transform: scale(0.5) translateY(-140px); opacity: 0; }
}

/* Chat */
.live-chat-col {
    background: var(--tk-card-bg, #16162A);
    border: 1px solid rgba(212,175,55,0.15);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 560px;
}
.chat-header {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(212,175,55,0.15);
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 14px;
    color: var(--tk-text, #F0EDE4);
}
.chat-viewer { font-size: 12px; color: var(--tk-text-dim, #A09880); }

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.chat-msg {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
}
.chat-msg--gift {
    background: rgba(212,175,55,0.08);
    border-radius: 8px;
    padding: 4px 8px;
}
.chat-avatar img { width: 20px; height: 20px; border-radius: 50%; }
.chat-nick { font-weight: 600; color: var(--tk-gold, #D4AF37); white-space: nowrap; font-size: 12px; }
.chat-text { color: var(--tk-text, #F0EDE4); word-break: break-word; }

.chat-input-wrap {
    display: flex;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid rgba(212,175,55,0.15);
}
.chat-input {
    flex: 1;
    background: var(--tk-black3, #1A1A2E) !important;
    border: 1px solid rgba(212,175,55,0.2) !important;
    color: var(--tk-text, #F0EDE4) !important;
    border-radius: 20px !important;
    padding: 8px 14px !important;
    font-size: 13px;
}
.chat-send-btn {
    background: var(--tk-gold, #D4AF37);
    color: #0A0A12;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;
}

/* More lives */
.more-lives { max-width: 1200px; margin: 24px auto; padding: 0 16px; }
.section-header h3 { font-size: 18px; font-weight: 700; color: var(--tk-text, #F0EDE4); margin-bottom: 16px; }

.live-room-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}
.live-room-card {
    background: var(--tk-card-bg, #16162A);
    border: 1px solid rgba(212,175,55,0.15);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.25s;
    text-decoration: none;
}
.live-room-card:hover {
    border-color: var(--tk-gold, #D4AF37);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.live-card-thumb { position: relative; }
.live-card-thumb img { width: 100%; height: 130px; object-fit: cover; }
.live-card-badge {
    position: absolute; top: 6px; left: 6px;
    background: rgba(255,59,48,0.9); color: #fff;
    font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 6px;
}
.live-card-viewers {
    position: absolute; bottom: 6px; right: 6px;
    background: rgba(0,0,0,0.7); color: #fff;
    font-size: 11px; padding: 2px 7px; border-radius: 6px;
}
.live-card-info { display: flex; align-items: center; gap: 8px; padding: 10px; }
.live-card-avatar { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid rgba(212,175,55,0.4); }
.live-card-title { font-size: 13px; font-weight: 600; color: var(--tk-text, #F0EDE4); }
.live-card-creator { font-size: 11px; color: var(--tk-text-dim, #A09880); }
</style>
