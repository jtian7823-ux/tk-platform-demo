<template>
    <div class="page">
        <HeaderBar />
        <main class="content topup-page">

            <!-- Hero -->
            <div class="topup-hero">
                <div class="hero-title">💎 鑽石儲值</div>
                <div class="hero-sub">Diamond Top-Up</div>
                <div class="current-balance" v-if="authStore.isLoggedIn">
                    <span class="balance-label">目前餘額</span>
                    <span class="balance-val">💎 {{ authStore.coinBalance.toLocaleString() }}</span>
                </div>
                <div class="current-balance login-hint" v-else>
                    <span>請先登入再儲值</span>
                </div>
            </div>

            <!-- Packages -->
            <div class="packages-section">
                <div class="section-title">選擇儲值方案</div>
                <div class="packages-grid">
                    <div
                        class="pkg-card"
                        v-for="pkg in packages"
                        :key="pkg.id"
                        :class="{ selected: selectedPkg?.id === pkg.id, popular: pkg.id === 3 }"
                        @click="selectPkg(pkg)"
                    >
                        <div class="pkg-badge" v-if="pkg.id === 3">🔥 最受歡迎</div>
                        <div class="pkg-badge vip" v-if="pkg.id === 5">👑 VIP</div>
                        <div class="pkg-coins">💎 {{ pkg.coins.toLocaleString() }}</div>
                        <div class="pkg-bonus" v-if="pkg.bonus > 0">+ {{ pkg.bonus }} 贈送</div>
                        <div class="pkg-total" v-if="pkg.bonus > 0">共 {{ (pkg.coins + pkg.bonus).toLocaleString() }} 鑽石</div>
                        <div class="pkg-price">NT$ {{ pkg.price_twd }}</div>
                        <div class="pkg-name">{{ pkg.name }}</div>
                    </div>
                </div>
            </div>

            <!-- Payment Method -->
            <div class="payment-section" v-if="selectedPkg">
                <div class="section-title">付款方式</div>
                <div class="payment-methods">
                    <div
                        class="pay-method"
                        v-for="m in payMethods"
                        :key="m.id"
                        :class="{ selected: selectedMethod === m.id }"
                        @click="selectedMethod = m.id"
                    >
                        <span class="method-icon">{{ m.icon }}</span>
                        <span class="method-name">{{ m.name }}</span>
                    </div>
                </div>

                <!-- Order summary -->
                <div class="order-summary">
                    <div class="summary-row">
                        <span>方案</span>
                        <span>{{ selectedPkg.name }}</span>
                    </div>
                    <div class="summary-row">
                        <span>鑽石</span>
                        <span style="color: #FFD700">💎 {{ (selectedPkg.coins + selectedPkg.bonus).toLocaleString() }}</span>
                    </div>
                    <div class="summary-row total">
                        <span>付款金額</span>
                        <span style="color: #D4AF37; font-size: 22px">NT$ {{ selectedPkg.price_twd }}</span>
                    </div>
                </div>

                <button class="pay-btn" @click="startPayment" :disabled="paying">
                    <span v-if="!paying">前往付款 →</span>
                    <span v-else>處理中...</span>
                </button>
            </div>

            <!-- Success message -->
            <div class="success-overlay" v-if="paySuccess">
                <div class="success-card">
                    <div class="success-icon">🎉</div>
                    <div class="success-title">儲值成功！</div>
                    <div class="success-coins">+ 💎 {{ addedCoins.toLocaleString() }} 鑽石</div>
                    <div class="success-balance">新餘額：💎 {{ newBalance.toLocaleString() }}</div>
                    <button class="close-btn" @click="paySuccess = false; refreshBalance()">確認</button>
                </div>
            </div>

            <!-- FAQ -->
            <div class="faq-section">
                <div class="section-title">常見問題</div>
                <div class="faq-item" v-for="faq in faqs" :key="faq.q">
                    <div class="faq-q">❓ {{ faq.q }}</div>
                    <div class="faq-a">{{ faq.a }}</div>
                </div>
            </div>

            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderBar from '../components/HeaderBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { useAuthStore } from '../stores/auth'
import '../assets/css/style.css'

const authStore = useAuthStore()

const packages   = ref([])
const selectedPkg  = ref(null)
const selectedMethod = ref('credit_card')
const paying     = ref(false)
const paySuccess = ref(false)
const addedCoins = ref(0)
const newBalance = ref(0)

const payMethods = [
    { id: 'credit_card', icon: '💳', name: '信用卡 / 簽帳卡' },
    { id: 'qr_code',     icon: '📱', name: 'QR Code 掃碼付款' },
    { id: 'bank',        icon: '🏦', name: '銀行轉帳' },
]

const faqs = [
    { q: '鑽石可以退款嗎？',    a: '鑽石屬於虛擬貨幣，一旦儲值成功無法退款，請確認後再付款。' },
    { q: '鑽石有使用期限嗎？',   a: '鑽石無使用期限，請放心使用。' },
    { q: '可以送禮物給 Creator 嗎？', a: '可以！在直播間選擇禮物，消耗鑽石即可送出，Creator 可獲得 70% 收益。' },
    { q: '付款後多久到帳？',     a: '付款成功後立即到帳，可在個人頁面查看餘額。' },
]

onMounted(async () => {
    try {
        const res = await fetch('/api/v2/payments/packages')
        const data = await res.json()
        packages.value = data.data?.list || []
    } catch (e) {
        // Fallback packages if API not running
        packages.value = [
            { id: 1, name: '體驗包',  coins: 100,  price_twd: 99,   bonus: 0    },
            { id: 2, name: '入門包',  coins: 500,  price_twd: 499,  bonus: 50   },
            { id: 3, name: '進階包',  coins: 1200, price_twd: 999,  bonus: 200  },
            { id: 4, name: '豪華包',  coins: 3000, price_twd: 2499, bonus: 600  },
            { id: 5, name: 'VIP 包',  coins: 6000, price_twd: 4999, bonus: 1500 },
        ]
    }
})

const selectPkg = (pkg) => {
    selectedPkg.value = pkg
}

const startPayment = async () => {
    if (!authStore.isLoggedIn) {
        alert('請先登入再儲值')
        return
    }
    paying.value = true
    try {
        // Create order
        const res = await fetch('/api/v2/payments/topup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
            body: JSON.stringify({ package_id: selectedPkg.value.id }),
        })
        const data = await res.json()
        if (data.code !== 0) throw new Error(data.message)

        const orderNo   = data.data.order_no
        const payUrl    = data.data.payment_url
        const coinsAdded = data.data.coins

        // Listen for payment success from popup
        const onMessage = (event) => {
            if (event.data?.type === 'payment_success' && event.data?.order_no === orderNo) {
                window.removeEventListener('message', onMessage)
                addedCoins.value = event.data.coins
                newBalance.value = (authStore.coinBalance || 0) + event.data.coins
                paySuccess.value = true
                paying.value = false
                // Update auth store balance
                if (authStore.user) {
                    authStore.user.coin_balance = newBalance.value
                    localStorage.setItem('tk_user', JSON.stringify(authStore.user))
                }
            }
        }
        window.addEventListener('message', onMessage)

        // Open payment popup
        const popup = window.open(payUrl, 'payment', 'width=480,height=640,top=100,left=200')
        if (!popup) {
            alert('請允許彈出視窗以完成付款')
            paying.value = false
        }

        // Timeout cleanup
        setTimeout(() => {
            window.removeEventListener('message', onMessage)
            if (paying.value) paying.value = false
        }, 120000)
    } catch (e) {
        alert('建立訂單失敗：' + e.message)
        paying.value = false
    }
}

const refreshBalance = async () => {
    await authStore.fetchProfile()
}
</script>

<style scoped>
.topup-page { background: var(--tk-black); min-height: 100vh; }

.topup-hero {
    background: linear-gradient(135deg, #16162A 0%, #1A1A3E 100%);
    border-bottom: 1px solid rgba(212,175,55,0.2);
    padding: 40px 20px 32px;
    text-align: center;
}
.hero-title { font-size: 32px; font-weight: 800; color: #D4AF37; }
.hero-sub { font-size: 14px; color: #A09880; margin-top: 4px; }
.current-balance {
    display: inline-flex; align-items: center; gap: 12px;
    background: rgba(212,175,55,0.1);
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: 40px; padding: 10px 24px; margin-top: 20px;
}
.balance-label { color: #A09880; font-size: 14px; }
.balance-val { color: #FFD700; font-size: 20px; font-weight: 700; }
.login-hint { color: #A09880; font-size: 14px; }

.packages-section, .payment-section, .faq-section {
    max-width: 680px; margin: 0 auto; padding: 32px 16px;
}
.section-title {
    font-size: 18px; font-weight: 700; color: #F0EDE4;
    margin-bottom: 20px;
}
.section-title::before {
    content: ''; display: inline-block; width: 4px; height: 1em;
    background: linear-gradient(180deg, #FFD700, #D4AF37);
    border-radius: 2px; margin-right: 10px; vertical-align: middle;
}

.packages-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;
}
.pkg-card {
    background: #16162A; border: 2px solid rgba(212,175,55,0.15);
    border-radius: 16px; padding: 20px 12px; text-align: center;
    cursor: pointer; transition: all 0.2s; position: relative;
}
.pkg-card:hover { border-color: rgba(212,175,55,0.5); transform: translateY(-3px); }
.pkg-card.selected { border-color: #D4AF37; background: rgba(212,175,55,0.1); }
.pkg-card.popular { border-color: rgba(255,107,107,0.5); }
.pkg-badge {
    position: absolute; top: -10px; left: 50%; transform: translateX(-50%);
    background: #C0392B; color: #fff; font-size: 10px; font-weight: 700;
    padding: 2px 10px; border-radius: 20px; white-space: nowrap;
}
.pkg-badge.vip { background: linear-gradient(135deg, #D4AF37, #B8960C); color: #0A0A12; }
.pkg-coins { font-size: 22px; font-weight: 800; color: #FFD700; margin: 8px 0 4px; }
.pkg-bonus { font-size: 11px; color: #C0392B; font-weight: 600; }
.pkg-total { font-size: 11px; color: #D4AF37; margin-bottom: 8px; }
.pkg-price { font-size: 18px; font-weight: 700; color: #D4AF37; margin: 8px 0 4px; }
.pkg-name { font-size: 12px; color: #A09880; }

.payment-methods { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.pay-method {
    display: flex; align-items: center; gap: 14px;
    background: #16162A; border: 1px solid rgba(212,175,55,0.15);
    border-radius: 12px; padding: 16px 20px; cursor: pointer; transition: all 0.2s;
}
.pay-method:hover, .pay-method.selected { border-color: #D4AF37; background: rgba(212,175,55,0.08); }
.method-icon { font-size: 24px; }
.method-name { font-size: 15px; color: #F0EDE4; }

.order-summary {
    background: #0A0A12; border-radius: 12px; padding: 20px; margin-bottom: 24px;
}
.summary-row {
    display: flex; justify-content: space-between;
    padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 14px; color: #A09880;
}
.summary-row:last-child { border-bottom: none; }
.summary-row.total { font-weight: 700; font-size: 16px; color: #F0EDE4; }

.pay-btn {
    width: 100%; padding: 18px; border: none;
    background: linear-gradient(135deg, #D4AF37, #B8960C);
    color: #0A0A12; font-size: 18px; font-weight: 800;
    border-radius: 14px; cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(212,175,55,0.3);
}
.pay-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,55,0.5); }
.pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.success-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.success-card {
    background: #16162A; border: 2px solid #D4AF37;
    border-radius: 24px; padding: 40px; text-align: center; width: 320px;
}
.success-icon { font-size: 64px; margin-bottom: 16px; }
.success-title { font-size: 24px; font-weight: 800; color: #D4AF37; margin-bottom: 8px; }
.success-coins { font-size: 28px; font-weight: 700; color: #FFD700; margin: 16px 0 8px; }
.success-balance { font-size: 14px; color: #A09880; margin-bottom: 24px; }
.close-btn {
    background: linear-gradient(135deg, #D4AF37, #B8960C);
    color: #0A0A12; border: none; padding: 14px 40px;
    border-radius: 40px; font-size: 16px; font-weight: 700; cursor: pointer;
}

.faq-section { border-top: 1px solid rgba(212,175,55,0.1); }
.faq-item { margin-bottom: 20px; }
.faq-q { font-size: 15px; font-weight: 600; color: #F0EDE4; margin-bottom: 6px; }
.faq-a { font-size: 14px; color: #A09880; line-height: 1.6; }
</style>
