<template>
    <Teleport to="body">
        <div v-if="visible" class="wm-backdrop" @click.self="onOk">
            <div class="wm-modal">
                <div class="modal-header">
                    <div class="modal-header-img">
                        <img src="/Image/00_Main Image/young-woman-lying-bed.webp" alt="">
                    </div>
                </div>
                <div class="modal-body">
                    <p class="wm-message" v-html="message"></p>
                    <h3 class="wm-title">{{ title }}</h3>
                    <div class="btn-group">
                        <button class="wm-btn-y" @click="onOk">ใช่ ! ฉันแน่ใจ</button>
                        <button class="wm-btn-n" @click="onBack">ไม่แน่ใจ</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'Warning',
    },
    message: {
        type: String,
        default: 'This is an important notice for today.',
    },
    cookieKey: {
        type: String,
        default: 'warningModal',
    },
})

const visible = ref(false)

function getTodayString() {
    // YYYY-MM-DD
    return new Date().toISOString().slice(0, 10)
}

function hasSeenToday() {
    const today = getTodayString()
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith(props.cookieKey + '='))

    if (!match) return false

    const value = match.split('=')[1]
    return value === today
}

function setTodayCookie() {
    const today = getTodayString()
    const expire = new Date()
    // 設到今天 23:59:59.999
    expire.setHours(23, 59, 59, 999)

    document.cookie = `${props.cookieKey}=${today}; expires=${expire.toUTCString()}; path=/`
}

function onOk() {
    setTodayCookie()
    visible.value = false
}

function onBack() {
    window.location.href = 'https://www.google.com'
}

onMounted(() => {
    if (!hasSeenToday()) {
        visible.value = true
    }
})
</script>

