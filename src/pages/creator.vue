<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <CreatorPage :creator="creator" />
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import CreatorPage from '../components/CreatorPage.vue'
import AppFooter from '../components/AppFooter.vue'
import '../assets/css/style.css'

</script>