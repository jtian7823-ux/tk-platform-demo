<template>
    <section class="member-setting">
        <div class="setting-inner">
            <!-- 左側：表單 -->
            <div class="setting-left">
                                <!-- Account -->
                                <div class="field-group">
                    <label class="field-label">Account</label>
                    <div class="field-box">
                        <!-- 只顯示 memberName，不需要 v-model -->
                        <input :value="member.memberName" type="text" class="field-input" readonly />
                    </div>
                </div>

                <!-- Creator Type -->
                <div class="field-group">
                    <label class="field-label">Creator Type</label>
                    <div class="field-box">
                        <!-- 顯示 memberType，同樣只讀 -->
                        <input :value="member.memberType" type="text" class="field-input" readonly />
                    </div>
                </div>

                <!-- Introduction -->
                <div class="field-group">
                    <label class="field-label">
                        Introduction
                        <span class="max-text">(The Maximum is 255.)</span>
                    </label>
                    <div class="field-box textarea-box">
                        <!-- 這個可以讓使用者編輯，所以用 v-model 綁 local 狀態 -->
                        <textarea v-model="introduction" class="field-textarea" maxlength="255"></textarea>
                    </div>
                </div>

                <button class="save-btn" @click="handleSave">
                    SAVE
                </button>
            </div>

            <!-- 右側：兩個卡片 -->
            <div class="setting-right">
                <router-link class="info-card" to="/favorite">
                    <div class="info-card-inner">
                        <img class="info-icon" :src="theme === 'b' ? '/Edit Profile/Icon_my_favorite_dark.webp' : '/Edit Profile/Icon_my_favorite.webp'" alt="">
                        <span class="info-text">My Favorite</span>
                    </div>
                </router-link>

                <router-link class="info-card" to="/purchase">
                    <div class="info-card-inner">
                        <img class="info-icon" :src="theme === 'b' ? '/Edit Profile/Icon_my_purchase_dark.webp' : '/Edit Profile/Icon_my_purchase.webp'" alt="">
                        <span class="info-text">My Purchase</span>
                    </div>
                </router-link>
                
                <router-link class="info-card" to="/clips-management">
                    <div class="info-card-inner">
                        <img class="info-icon" :src="theme === 'b' ? '/Edit Profile/Icon_clips_management_dark.webp' : '/Edit Profile/Icon_clips_management.webp'" alt="">
                        <span class="info-text">Clips Management</span>
                    </div>
                </router-link>

                <router-link class="info-card" to="/pending-review">
                    <div class="info-card-inner">
                        <img class="info-icon" :src="theme === 'b' ? '/Edit Profile/Icon_pending_review_dark.webp' : '/Edit Profile/Icon_pending_review.webp'" alt="">
                        <span class="info-text">Pending Review</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="creator-zone">
            <div class="creator-zone-title"><i></i> Creator Zone <i></i></div>
            <div class="creator-zone-btn-group">
                <router-link to="/income-statement" class="action-btn"><img :src="theme === 'b' ? '/Edit Profile/Icon_income_statement_dark.webp' : '/Edit Profile/Icon_income_statement.webp'" alt="">Income<br>Statement</router-link>
                <!-- <router-link to="" class="action-btn"><img src="/Edit Profile/Icon_my_follower.webp" alt="">My<br>Follower</router-link>
                <router-link to="" class="action-btn"><img src="/Edit Profile/Icon_daily_sales.webp" alt="">Daily<br>Sales</router-link> -->
                <router-link to="/withdrawal" class="action-btn"><img :src="theme === 'b' ? '/Edit Profile/Icon_my_wallet_dark.webp' : '/Edit Profile/Icon_my_wallet.webp'" alt="">My<br>Wallet</router-link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { inject } from 'vue'

const theme = inject('theme')

const { member } = defineProps({
    member: {
        type: Object,
        required: true,
    },
})

// 把介紹內容先從 props 裡帶進來
const introduction = ref(member.memberIntroduction ?? '')

const handleSave = () => {
    console.log('SAVE intro:', introduction.value)
    // 之後這裡可以接 API 或 emit 給父層
}
</script>
