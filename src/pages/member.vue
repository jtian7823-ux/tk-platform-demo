<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <MemberProfile :member="member" />
            <MemberCreator v-if="isCreator" :member="member" />
            <MemberAudience v-else :member="member" />
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { getMode } from '../stores/mode'
import HeaderBar from '../components/HeaderBar.vue'
import MemberProfile from '../components/MemberProfile.vue'
import MemberAudience from '../components/MemberAudience.vue'
import MemberCreator from '../components/MemberCreator.vue'
import AppFooter from '../components/AppFooter.vue'
import '../assets/css/style.css'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isCreator = computed(() => getMode() === 'creator')

// Use auth store data if logged in, else fallback
const member = computed(() => {
    if (authStore.isLoggedIn && authStore.user) {
        return {
            bannerImg: authStore.user.cover_image || '/Edit Profile/member_background.webp',
            avatarImg: authStore.user.avatar || '/Edit Profile/member_avatar.webp',
            memberName: authStore.user.nickname || authStore.user.username,
            memberMail: authStore.user.email || '',
            memberIntroduction: authStore.user.bio || 'ยินดีต้อนรับสู่ TK Platform 🙏',
            coinBalance: authStore.user.coin_balance || 0,
        }
    }
    return {
        bannerImg: '/Edit Profile/member_background.webp',
        avatarImg: '/Edit Profile/member_avatar.webp',
        memberName: 'Guest',
        memberMail: '-',
        memberIntroduction: 'กรุณาเข้าสู่ระบบ / Please login',
        coinBalance: 0,
    }
})
</script>