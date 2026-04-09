<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <NewsInner />
            <AppFooter />
        </main>
        <CreatorList />
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import NewsInner from '../components/NewsInner.vue'
import AppFooter from '../components/AppFooter.vue'
import CreatorList from '../components/CreatorList.vue'
</script>