<template>
    <BaseModal :show="show" modalClass="purchase" :hideHeader="true" @close="emit('close')">
        <div class="purchase-card">
            <div class="purchase-card-header">
                <span>ยอดเพชรคงเหลือ = {{ diamond }}</span>
                <span class="purchase-card-diamond">
                    <img src="/Logo&Icon/Member/Icon_buy_diamond.webp" alt="" />
                </span>
            </div>

            <div class="purchase-card-body">
                <h2 class="purchase-card-title">ซื้อเพชร</h2>

                <hr />

                <div class="purchase-card-section">
                    <h3 class="purchase-card-sectionTitle">ชำระเงิน QR-CODE:</h3>
                    <p class="purchase-card-sectionText">
                        กรุณากรอกชื่อและเลขบัญชีให้ตรงกับบัญชีที่ใช้โอนเงิน
                        หากข้อมูลบัญชีไม่ตรงกัน ระบบจะไม่สามารถรับเพชรได้อัตโนมัติ
                    </p>
                </div>

                <hr />

                <div class="purchase-card-section">
                    <h3 class="purchase-card-sectionTitle">Bitkub:</h3>
                    <p class="purchase-card-sectionText">
                        เพิ่มขั้นต่ำ 4 USDT (เช่น ต้องการชำระ: 17.79 USDT ต้องโอน 21.79 USDT)
                    </p>
                </div>

                <hr />

                <div class="purchase-card-section">
                    <h3 class="purchase-card-sectionTitle">Binance:</h3>
                    <p class="purchase-card-sectionText">
                        เพิ่มขั้นต่ำ 1 USDT (เช่น ต้องการชำระ: 17.79 USDT ต้องโอน 18.79 USDT)
                    </p>
                </div>

                <hr />

                <div class="packs">
                    <div v-for="p in packs" :key="p.id" class="pack" :class="{ active: isOpen(p.id) }"
                        @click="toggle(p.id)" role="button" tabindex="0" @keydown.enter.prevent="toggle(p.id)"
                        @keydown.space.prevent="toggle(p.id)">
                        <div class="pack-top">
                            <div class="left">
                                <span class="icon">
                                    <img src="/Edit Profile/Icon_buy_diamond.webp" alt="" />
                                </span>
                                <span class="diamonds">{{ p.diamonds }}</span>
                            </div>
                            <div class="right">THB {{ p.thb }}</div>
                        </div>

                        <transition name="drop">
                            <div v-if="isOpen(p.id)" class="pack-drop" @click.stop>
                                <div class="pay-list">
                                    <div v-for="(amount, currency) in p.pay" :key="currency" class="pay-row">
                                        <div class="pay-info">
                                            <div class="pay-label">{{ currency }}</div>
                                            <div class="pay-value">{{ Number(amount).toFixed(2) }} {{ currency }}</div>
                                        </div>

                                        <button type="button" class="buy-btn buy-btn--row"
                                            @click.stop="buy(p, currency, amount)">
                                            BUY
                                        </button>
                                    </div>
                                </div>

                                <div class="note">Payment will be charged in THB Currency</div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
    show: { type: Boolean, required: true },
    diamond: { type: Number, default: 0 },
})

const emit = defineEmits(['close', 'buy'])

const packs = ref([
    { id: 1, diamonds: 2999, thb: 199, pay: { USDT: 6.22, BTN: 100.31 } },
    { id: 2, diamonds: 9599, thb: 599, pay: { USDT: 18.7 } },
    { id: 3, diamonds: 18999, thb: 1099, pay: { USDT: 34.3 } },
    { id: 4, diamonds: 34999, thb: 1999, pay: { USDT: 62.4 } },
])

// 多個同時展開
const openSet = ref(new Set([1]))

function isOpen(id) {
    return openSet.value.has(id)
}

function toggle(id) {
    const s = new Set(openSet.value)
    s.has(id) ? s.delete(id) : s.add(id)
    openSet.value = s
}

function buy(p, currency, amount) {
    // 往外拋，讓父層決定要做什麼（下單/呼叫 API）
    emit('buy', { pack: p, currency, amount })
}
</script>