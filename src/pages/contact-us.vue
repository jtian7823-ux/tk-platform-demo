<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="contact-us-page">
                <div class="title-box">
                    <h1>Contact Us</h1>
                </div>
                <div class="card">
                    <h2 class="title">Social Media</h2>
                    <div class="link-group">
                        <router-link to=""><img src="/Logo&Icon/Logo/Logo_FB.webp" alt=""></router-link>
                        <router-link to=""><img src="/Logo&Icon/Logo/Logo_TW.webp" alt=""></router-link>
                        <router-link to=""><img src="/Logo&Icon/Logo/Logo_IG.webp" alt=""></router-link>
                        <router-link to=""><img src="/Logo&Icon/Logo/Logo_TT.webp" alt=""></router-link>
                    </div>
                </div>
                <div class="card">
                    <h2 class="title">ติดต่อฝ่ายบริการลูกค้า</h2>
                    <p class="subtitle">โปรดอธิบายรายละเอียดปัญหาของคุณให้ชัดเจน มากที่สุด เพื่อความรวดเร็วในการแก้ปัญหา
                    </p>

                    <form class="contact-form" @submit.prevent="onSubmit">

                        <div class="field">
                            <label class="label">ชื่อ–นามสกุล*</label>
                            <div class="input-wrap">
                                <input type="text" v-model="form.name" required placeholder="กรุณากรอก ชื่อ–นามสกุล ของคุณ" />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">อีเมล*</label>
                            <div class="input-wrap">
                                <input type="email" v-model="form.email" required placeholder="กรุณากรอกอีเมลของคุณ" />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">หัวข้อเรื่อง*</label>
                            <div class="input-wrap">
                                <input type="text" v-model="form.subject" required placeholder="กรุณากรอกหัวข้อเรื่องของคุณ" />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">ข้อความ*</label>
                            <div class="input-wrap textarea-wrap">
                                <textarea v-model="form.message" rows="5" required placeholder="กรุณากรอกข้อความของคุณ"></textarea>
                            </div>
                        </div>

                        <div class="btn-row">
                            <button type="submit" class="send-btn">Send</button>
                        </div>
                    </form>
                </div>
            </section>
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { reactive } from 'vue'

const form = reactive({
    name: '',
    email: '',
    subject: '',
    message: '',
})

const onSubmit = () => {
    console.log('contact form submit:', { ...form })
    alert('ส่งข้อความเรียบร้อยแล้ว (demo)')

    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
}

</script>