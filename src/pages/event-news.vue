<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <NewsList />
            <AppFooter />
        </main>
        <CreatorList />
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import NewsList from '../components/NewsList.vue'
import AppFooter from '../components/AppFooter.vue'
import CreatorList from '../components/CreatorList.vue'
</script>
