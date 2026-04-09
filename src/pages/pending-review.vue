<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="pending-review">
                <div class="title-box">
                    <h1>Pending Review</h1>
                </div>

                <div v-for="(item, index) in highlightClips" :key="index" class="highlight-card">
                    <!-- 左側圖片 -->
                    <div class="thumb">
                        <img :src="item.cover" :alt="item.title" />
                    </div>

                    <!-- 右側文字 -->
                    <div class="info">
                        <h2 class="title">
                            {{ item.title }}
                        </h2>
                        <p class="desc">
                            {{ item.description }}
                        </p>
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

const highlightClips = [
    {
        cover: '/Image/Clips_02.webp',
        title: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
        description:'Lorem ipsum dolor sit amet consectetur. Pharetra massa dignissim eget faucibus egestas. Lorem ipsum dolor sit amet consectetur. Pharetra massa dignissim eget faucibus egestas. Lorem ipsum dolor sit amet consectetur. Pharetra massa dignissim eget faucibus egestas.',
    },
    {
        cover: '/Image/Clips_01.webp',
        title: 'Another highlight clip title for example',
        description:'Lorem ipsum dolor sit amet consectetur. Pharetra massa dignissim eget faucibus egestas. Lorem ipsum dolor sit amet consectetur.',
    },
]
</script>
