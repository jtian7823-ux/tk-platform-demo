<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="upload-page">
                <div class="title-box">
                    <h1>Upload Video</h1>
                </div>

                <div class="link-group">
                    <router-link class="link-short" to="/upload-short">
                        <span>
                            <img src="/Logo&Icon/Logo/Upload-Short.webp" alt="">
                            Upload Short
                        </span>
                    </router-link>
                    <router-link class="link-video" to="/upload-video">
                        <span>
                            <img src="/Logo&Icon/Logo/Upload-Video.webp" alt="">
                            Upload Video
                        </span>
                    </router-link>
                </div>
            </section>
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
    import HeaderBar from "../components/HeaderBar.vue";
    import AppFooter from "../components/AppFooter.vue";

</script>