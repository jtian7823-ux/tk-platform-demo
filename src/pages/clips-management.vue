<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="clips-management">
                <div class="title-box">
                    <h1>Clips Management</h1>
                </div>
                <div v-for="(clip, index) in clips" :key="index" class="clip-card">
                    <!-- 左側封面 -->
                    <div class="thumb">
                        <img :src="clip.cover" :alt="clip.title" />
                        <button class="play-icon"><img :src="theme ==='b' ? '/Logo&Icon/Watch Clips/Icon_play_dark.webp' : '/Logo&Icon/Watch Clips/Icon_play.webp'" alt=""></button>
                    </div>

                    <!-- 右側內容 -->
                    <div class="info">
                        <div class="info-right">
                            <h2 class="title">{{ clip.title }}</h2>
                            <div class="tag-group">
                                Hashtag :
                                <span v-for="tag in clip.tags.slice(0, 6)" :key="tag" class="tag-pill">
                                    {{ tag }}
                                </span>

                                <span v-if="clip.tags.length > 6" class="tag-pill more-pill">
                                    +{{ clip.tags.length - 6 }}
                                </span>
                            </div>
                        </div>

                        <div class="info-middle">
                            <div class="meta-top">
                                <span class="video-pill">{{ clip.sort }}</span>
                                <span class="video-pill">{{ clip.property }}</span>
                            </div>
                            <div class="meta-bottom">
                                <div class="stat">
                                    <img src="/Home/Icon_view_white.webp" alt="" />
                                    <span>{{ clip.views }}</span>
                                </div>
                                <div class="stat">
                                    <img src="/Home/Icon_favorite_white.webp" alt="" />
                                    <span>{{ clip.favorites }}</span>
                                </div>
                                <div class="stat">
                                    <img src="/Home/Icon_wallet.webp" alt="" />
                                    <span>{{ clip.wallet }}</span>
                                </div>
                                <div class="stat">
                                    <img :src="theme === 'b' ? '/Home/Icon_diamond_dark.webp' : '/Home/Icon_diamond.webp'" alt="" />
                                    <span>{{ clip.diamonds }}(${{ (clip.diamonds / 100).toFixed(0) }})</span>
                                </div>
                            </div>
                        </div>

                        <!-- 下排：數據 + 按鈕 -->
                        <div class="info-right">
                            <div class="status-pill" :class="clip.status.toLowerCase()">
                                <span class="dot"></span>
                                <span class="status-text">{{ clip.status }}</span>
                            </div>
                            <router-link class="edit-btn" to="/clips-edit"><img src="/Edit Profile/Icon_edit_blue.webp" alt="Edit name" />Edit Clips</router-link>
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
import { inject } from 'vue'

const theme = inject('theme')

const clips = [
    {
        cover: '/Image/Clips_01.webp',
        title: 'คืนนี้หนูอยู่ที่าย',
        tags: ['Japan', 'NTR', 'MILF', 'Big boob', 'Wife', 'Japan', 'NTR', 'MILF', 'Big boob', 'Wife'],
        sort: 'Sexy',
        property: 'Video',
        status: 'Online',
        views: 999,
        favorites: 999,
        wallet: 999,
        diamonds: 999,
    },
    {
        cover: '/Image/Clips_02.webp',
        title: 'คืนนี้หนูอยู่ที่าย',
        tags: ['Japan', 'Big boob', 'Wife', 'Japan', 'NTR', 'MILF', 'Big boob', 'Wife'],
        sort: 'Sexy',
        property: 'Video',
        status: 'Pending',
        views: 44,
        favorites: 8,
        wallet: 69,
        diamonds: 100,
    },
]
</script>