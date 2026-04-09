<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="withdrawal-page">
                <div class="title-box">
                    <h1>Withdrawal</h1>
                </div>

                <!-- 黃色提示條 -->
                <div class="notice-bar">
                    ใช้เวลาในการดำเนินการถอนเงิน ประมาณ 3-5 วันทำการ
                    <br>
                    หากข้อมูลไม่ครบถ้วนจะกระทบต่อเวลาที่ได้รับเงิน
                </div>

                <!-- 上半部：Diamonds + THB / USDT -->
                <div class="top-section">
                    <!-- 左邊 Diamonds -->
                    <div class="diamonds-card">

                        <div class="diamonds-amount">
                            <div class="diamonds-header">
                                <img class="diamond-icon" :src="theme ==='b' ? '/Logo&Icon/Income Statement & Withdrawal/Icon_diamond_dark.webp' : '/Logo&Icon/Income Statement & Withdrawal/Icon_diamond_green.webp'" alt="">
                                <span class="title">Diamonds</span>
                            </div>
                            {{ summary.diamonds.toLocaleString() }}
                        </div>

                        <div class="diamonds-footer">
                            กรุณาเลือกสกุลเงินที่ต้องการถอน : THB หรือ USDT
                        </div>
                    </div>

                    <!-- 右邊兩張藍卡 -->
                    <div class="currency-column">
                        <div v-for="opt in withdrawOptions" :key="opt.code" class="currency-card">
                            <div class="currency-header">
                                <div class="left">
                                    <img class="currency-icon" :src="theme === 'b' ? opt.iconB : opt.iconA" alt="">
                                    <div class="currency-rate">
                                        <span>{{ opt.code }}:</span>
                                        {{ opt.rate }}
                                    </div>
                                </div>
                                <div class="right">
                                    {{ opt.amount }}
                                </div>
                            </div>

                            <div class="currency-footer">
                                {{ opt.note }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 提款紀錄 -->
                <div class="history-section">
                    <div class="history-header">
                        <div class="divider"></div>
                        <div class="title">
                            <span class="logo">S</span>
                            <span class="text">ประวัติการถอนเงิน</span>
                        </div>
                        <div class="divider"></div>
                    </div>

                    <div class="history-table">
                        <div class="history-header-row">
                            <div class="cell">ลำดับที่</div>
                            <div class="cell">หมายเลขการถอน</div>
                            <div class="cell">ประเภทบัญชี</div>
                            <div class="cell">จำนวนเพชร</div>
                            <div class="cell">จำนวน USDT</div>
                            <div class="cell">สถานะ</div>
                            <div class="cell last">วันที่ทำรายการ</div>
                        </div>

                        <div v-if="history.length === 0" class="history-empty-row">
                            ไม่พบผลลัพธ์
                        </div>

                        <div v-else v-for="(item, idx) in history" :key="item.id" class="history-row">
                            <div class="cell">{{ idx + 1 }}</div>
                            <div class="cell">{{ item.txId }}</div>
                            <div class="cell">{{ item.accountType }}</div>
                            <div class="cell">{{ item.diamonds }}</div>
                            <div class="cell">{{ item.usdt }}</div>
                            <div class="cell">{{ item.status }}</div>
                            <div class="cell last">{{ item.date }}</div>
                        </div>
                    </div>
                </div>
            </section>
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { ref, inject } from 'vue'

const theme = inject('theme')

// 上面 diamonds & 提示
const summary = ref({
    diamonds: 1000,
})

// 右側 THB / USDT 卡片資料
const withdrawOptions = ref([
    {
        iconA: '/Logo&Icon/Income Statement & Withdrawal/Icon_THB.webp',
        iconB: '/Logo&Icon/Income Statement & Withdrawal/Icon_THB_dark.webp',
        code: 'THB',
        rate: '1/18 Diamonds',
        amount: 699,
        note: 'ยอดถอนต้องมากกว่า 2,000 บาท',
    },
    {
        iconA: '/Logo&Icon/Income Statement & Withdrawal/Icon_USDT.webp',
        iconB: '/Logo&Icon/Income Statement & Withdrawal/Icon_USDT_dark.webp',
        code: 'USDT',
        rate: '1/33.49 THB',
        amount: 28,
        note: 'ยอดถอนต้องมากกว่า 60 USDT',
    },
])

// 提款紀錄（現在先用空陣列，之後可以改成 API 資料）
// const history = ref([])
const history = ref([{
    id: 1,
    txId: 'WD20250001',
    accountType: 'USDT',
    diamonds: 1000,
    usdt: 28,
    status: 'Pending',
    date: '2025-01-01',
}])
</script>