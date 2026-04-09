<template>
    <div class="page">
        <HeaderBar />

        <main class="content">
            <MainSection />

            <!-- 小於 575px：插在中間 -->
            <CreatorList v-if="isMobile" />

            <AppFooter />
        </main>

        <!-- 大於等於 575px：維持原本位置 -->
        <CreatorList v-if="!isMobile" />
    </div>
</template>


<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import MainSection from '../components/MainSection.vue'
import AppFooter from '../components/AppFooter.vue'
import CreatorList from '../components/CreatorList.vue'
import {ref, onMounted, onUnmounted} from 'vue'

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
</script>
