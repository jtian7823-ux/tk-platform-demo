<template>
    <footer class="footer">
        <div class="inner">
            <hr>
            <div class="link-group">
                <router-link to="/about-us">About Us</router-link>
                <router-link to="/become-creator">Become a Creator</router-link>
                <router-link to="/legal-notice">Legal Notice</router-link>
                <router-link to="/privacy-policy">Privacy</router-link>
                <router-link to="/faq">FAQ</router-link>
            </div>
            <hr>
            <div class="community-group">
                <router-link to=""><img src="/Logo&Icon/Logo/Logo_FB.webp" alt=""></router-link>
                <router-link to=""><img src="/Logo&Icon/Logo/Logo_TW.webp" alt=""></router-link>
                <router-link to=""><img src="/Logo&Icon/Logo/Logo_IG.webp" alt=""></router-link>
                <router-link to=""><img src="/Logo&Icon/Logo/Logo_TT.webp" alt=""></router-link>
                <router-link to=""><img src="/Logo&Icon/Logo/Logo_TG.webp" alt=""></router-link>
            </div>
        </div>
    </footer>
</template>

<script setup>
import 'swiper/css'

const year = new Date().getFullYear()
</script>

