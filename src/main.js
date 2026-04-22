import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './assets/css/style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// 讀取上次主題，預設 a
const theme = ref(localStorage.getItem('theme') || 'a')

// 套到 html
document.documentElement.setAttribute('data-theme', theme.value)

function setTheme(t) {
    theme.value = t
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
}

function toggleTheme() {
    setTheme(theme.value === 'a' ? 'b' : 'a')
}

app.provide('theme', theme)
app.provide('setTheme', setTheme)
app.provide('toggleTheme', toggleTheme)

// ✅ router 一定要在 mount 前 use
app.use(router)
app.mount('#app')
