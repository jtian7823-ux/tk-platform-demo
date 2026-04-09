<template>
    <div class="page">
        <HeaderBar />
        <main class="content blue">
            <CreatorListPage />
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import CreatorListPage from '../components/CreatorListPage.vue'
import AppFooter from '../components/AppFooter.vue'
</script>