<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <MyPurchase />
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import MyPurchase from '../components/MyPurchase.vue'
import AppFooter from '../components/AppFooter.vue'
import '../assets/css/style.css'


</script>