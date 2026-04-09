<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <MyFavorite />
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import MyFavorite from '../components/MyFavorite.vue'
import AppFooter from '../components/AppFooter.vue'
import '../assets/css/style.css'


</script>