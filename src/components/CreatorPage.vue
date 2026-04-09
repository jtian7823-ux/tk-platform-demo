<template>
    <section class="creator-page">
        <div class="creator-banner">
            <img class="banner-img" :src="creator.bannerImg" alt="Banner" />
            <button class="banner-camera-btn">
                <img src="/Edit Profile/Icon_change_image.webp" alt="Change banner" />
            </button>
        </div>

        <div class="creator-main">
            <div class="creator-left">
                <div class="avatar-wrapper">
                    <div class="avatar-circle">
                        <img class="avatar-img" :src="creator.avatarImg" :alt="creator.creatorName" />
                    </div>
                    <span v-if="isMobile" class="creator-name">{{ creator.creatorName }}</span>
                </div>

                <div class="creator-info">
                    <div class="creator-name-row">
                        <span v-if="!isMobile" class="creator-name"> {{ creator.creatorName }}</span>
                        <div class="creator-fs-box">
                            {{ creator.followers }}
                            <t>Followers</t>
                        </div>
                        <div class="creator-fs-box">
                            {{ creator.followings }}
                            <t>Followings</t>
                        </div>
                        <button class="follow-btn">
                            <img src="/Logo&Icon/Watch Clips/Icon_follow.webp" alt="">
                            Follow
                        </button>
                    </div>
                    <div class="creator-introduction">{{ creator.creatorIntroduction }}</div>
                </div>
            </div>
        </div>

        <!-- 內容區 -->
        <div class="content">
            <!-- Tabs -->
            <div class="creator-video-tabs">
                <button v-for="tab in tabs" :key="tab.key" :class="['tab-btn', { active: activeTab === tab.key }]"
                    @click="activeTab = tab.key">
                    {{ tab.label }}
                </button>
            </div>
            <!-- Clips 區塊 -->
            <section v-if="showClips" class="section">
                <h2 class="section-title">Clips</h2>
                <div class="card-grid">
                    <div v-for="(clip, index) in clips" :key="index" class="clips-card">

                        <div class="card-cover">
                            <img :src="clip.clipCover" :alt="clip.clipTitle">
                        </div>

                        <div class="card-footer">
                            <div class="clips-title">{{ clip.clipTitle }}</div>

                            <div class="video-inner">
                                <div class="video-inner-left">
                                    <div class="inner-favorite">
                                        <img src="/Home/Icon_favorite_white.webp" alt="" />
                                        <span class="favorite-num">{{ clip.clipFavorite }}</span>
                                    </div>
                                    <div class="inner-view">
                                        <img src="/Home/Icon_view_white.webp" alt="" />
                                        <span class="view-num">{{ clip.clipView }}</span>
                                    </div>
                                </div>

                                <div class="video-inner-right">
                                    <img src="/Home/Icon_diamond.webp" alt="" />
                                    <span class="diamond-num">{{ clip.clipdiamond }}</span>
                                    <span class="money-num">
                                        (${{ (Number(clip.clipdiamond) / 100).toFixed(1) }})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Shorts 區塊 -->
            <section v-if="showShorts" class="section">
                <h2 class="section-title">Shorts</h2>
                <div class="card-grid av">
                    <div v-for="(short, index) in shorts" :key="index" class="shorts-card">
                        <div class="thumb-wrap">
                            <img :src="short.shortCover" :alt="short.shortTitle" />
                        </div>
                        <div class="card-info">
                            <p class="title">{{ short.shortTitle }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 沒有內容時 -->
            <p v-if="!showClips && !showShorts" class="empty-text">
                沒有內容
            </p>
        </div>
    </section>
</template>


<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue'

const isMobile = ref(window.innerWidth < 575)

const onResize = () => {
        isMobile.value = window.innerWidth < 575
    }

onMounted(() => {
        window.addEventListener('resize', onResize)
    })

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
})

const creator = {
    bannerImg: '/Edit Profile/member_background.webp',
    avatarImg: '/Edit Profile/member_avatar.webp',
    creatorName: 'Creator01',
    creatorMail: 'member01@gmail.com',
    creatorIntroduction: 'Lorem ipsum dolor sit amet consectetur. Erat et duis vel odio odio congue penatibus sit. Id blandit diam ut aliquam elementum tempus lacus aliquet ut. Adipiscing id elementum proin.Lorem ipsum dolor sit amet consectetur.',
    followers: '6969',
    followings: '669',
    follow: '0',
}

const tabs = [
    { key: 'all', label: 'All' },
    { key: 'clips', label: 'Clips' },
    { key: 'shorts', label: 'Shorts' },
]

const activeTab = ref('all')

const clips = [
    { clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100' },
    { clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100' },
    { clipCover: '/Image/Clips_03.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '0' },
    { clipCover: '/Image/Clips_01.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100' },
    { clipCover: '/Image/Clips_02.webp', clipTitle: 'clip title test test test test test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900' },
]

const shorts = [
    { shortCover: '/Image/Shorts_01.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_03.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_01.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_03.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_01.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
    { shortCover: '/Image/Shorts_02.webp', shortTitle: 'shorts title test test test, shorts title test test test' },
]

const showClips = computed(() => activeTab.value === 'all' || activeTab.value === 'clips')
const showShorts = computed(() => activeTab.value === 'all' || activeTab.value === 'shorts')

</script>
