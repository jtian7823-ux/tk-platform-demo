<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="income-page">
                <div class="title-box">
                    <h1>Pending Review</h1>
                </div>

                <div class="toolbar">
                    <div class="report-type">
                        <span class="label">Report :</span>

                        <button v-for="type in reportTypes" :key="type"
                            :class="['tab', { active: activeReport === type }]" @click="activeReport = type">
                            {{ type }}
                        </button>
                    </div>

                    <div class="date-range">
                        <div class="date-input">
                            <input type="date" v-model="startDate" />
                        </div>
                        <div class="date-input">
                            <input type="date" v-model="endDate" />
                        </div>
                        <button class="search-btn">
                            <img :src="theme === 'b' ? '/Logo&Icon/Income Statement & Withdrawal/Icon_search_dark.webp' : '/Logo&Icon/Income Statement & Withdrawal/Icon_search.webp'" alt="">
                        </button>
                    </div>
                </div>

                <!-- 統計卡片 -->
                <div class="stats-grid">
                    <div v-for="stat in displayStats" :key="stat.key" class="stat-card">
                        <div class="stat-icon">
                            <img :src="stat.icon" :alt="stat.label" />
                            <div class="stat-label" v-html="stat.label"></div>
                        </div>
                        <div class="stat-value">{{ stat.value }}</div>
                    </div>
                </div>

                <!-- 總收入 -->
                <div class="total-revenue-card">
                    <div class="left">
                        <img class="icon" :src="theme === 'b' ? '/Logo&Icon/Income Statement & Withdrawal/Icon_total_revenue_dark.webp' : '/Logo&Icon/Income Statement & Withdrawal/Icon_total_revenue.webp'" alt="">
                        <span class="text">Total Revenue</span>
                    </div>
                    <div class="right">
                        {{ totalRevenue }}
                    </div>
                </div>

                <!-- 詳細列表 -->
                <div class="detail-section">
                    <div class="detail-header">
                        <div class="divider"></div>
                        <div class="title">
                            <span class="logo">S</span>
                            <span class="text">รายละเอียดยอดขาย</span>
                        </div>
                        <div class="divider"></div>
                    </div>

                    <div class="detail-table">
                        <div class="empty-row">
                            ยังไม่มีผลลัพธ์
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

import { computed, ref, inject } from 'vue'

const theme = inject('theme')

const reportTypes = ['Daily', 'Weekly', 'Monthly']
const activeReport = ref('Daily')

// 統計卡片的基本資訊（不會因報表類型改變）
const cardInfo = [
    {
        key: 'follower',
        label: 'My <br> Follower',
        iconA: '/Logo&Icon/Income Statement & Withdrawal/Icon_my_follower.webp',
        iconB: '/Logo&Icon/Income Statement & Withdrawal/Icon_my_follower_dark.webp',
        statKey: 'followerValue',
    },
    {
        key: 'uploaded',
        label: 'Uploaded <br> Clips',
        iconA: '/Logo&Icon/Income Statement & Withdrawal/Icon_uploaded_clips.webp',
        iconB: '/Logo&Icon/Income Statement & Withdrawal/Icon_uploaded_clips_dark.webp',
        statKey: 'uploadedValue',
    },
    {
        key: 'favorite',
        label: 'Favorite <br> Clips',
        iconA: '/Logo&Icon/Income Statement & Withdrawal/Icon_favorite_clips.webp',
        iconB: '/Logo&Icon/Income Statement & Withdrawal/Icon_favorite_clips_dark.webp',
        statKey: 'favoriteValue',
    },
    {
        key: 'purchased',
        label: 'Purchased <br> Clips',
        iconA: '/Logo&Icon/Income Statement & Withdrawal/Icon_purchase_clips.webp',
        iconB: '/Logo&Icon/Income Statement & Withdrawal/Icon_purchase_clips_dark.webp',
        statKey: 'purchasedValue',
    },
]

// 日期預設今天
const today = new Date().toISOString().slice(0, 10)
const startDate = ref(today)
const endDate = ref(today)

// 各報表類型對應的數值
const stats = {
    Daily: {
        followerValue: 12,
        uploadedValue: 1,
        favoriteValue: 8,
        purchasedValue: 20,
        totalRevenue: 123,
    },
    Weekly: {
        followerValue: 24,
        uploadedValue: 4,
        favoriteValue: 48,
        purchasedValue: 69,
        totalRevenue: 696,
    },
    Monthly: {
        followerValue: 80,
        uploadedValue: 10,
        favoriteValue: 120,
        purchasedValue: 180,
        totalRevenue: 2048,
    },
}

// 依目前 activeReport 算出要顯示的卡片陣列
const displayStats = computed(() => {
    const isB = theme?.value === 'b'

    return cardInfo.map((c) => ({
        key: c.key,
        label: c.label,
        icon: isB ? c.iconB : c.iconA,
        value: stats.value?.[c.statKey] ?? 0, // 依你實際資料改
    }))
})


// 總收入也跟著 tab 切換
const totalRevenue = computed(() => {
    const current = stats[activeReport.value]
    return current ? current.totalRevenue : 0
})
</script>