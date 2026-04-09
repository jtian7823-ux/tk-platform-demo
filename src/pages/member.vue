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

const isCreator = computed(() => getMode() === 'creator')

const member = {
    bannerImg: '/Edit Profile/member_background.webp',
    avatarImg: '/Edit Profile/member_avatar.webp',
    memberName: 'Member01',
    memberMail: 'member01@gmail.com',
    memberIntroduction: 'Lorem ipsum dolor sit amet consectetur. Urna risus leo purus leo risus ac in lacus...'
}
</script>