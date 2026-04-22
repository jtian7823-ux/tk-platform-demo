<template>
    <header class="header">
        <div class="inner" :class="{ scroll: isScrolled }">
            <div class="inner-left">
                <router-link to="/" class="logo-link">
                    <img :src="theme === 'b' ? '/Logo&Icon/Logo/Logo_gary.webp' : '/Logo&Icon/Logo/Logo_green.webp'"
                        alt="logo" class="logo" />
                </router-link>

                <nav class="nav">
                    <router-link class="active" to="/"><img src="/Logo&Icon/Menu/Icon_home_normal.webp" alt="" /></router-link>
                    <router-link to="/short-play"><img src="/Logo&Icon/Menu/Icon_shorts_normal.webp" alt="" /></router-link>
                    <router-link to="/upload"><img src="/Logo&Icon/Menu/Icon_upload_normal.webp" alt="" /></router-link>
                    <router-link to="/creator-list"><img src="/Logo&Icon/Menu/Icon_creators_normal.webp" alt="" /></router-link>
                </nav>
            </div>

            <div class="inner-right">
                <button
                    class="theme-toggle"
                    type="button"
                    role="switch"
                    :aria-checked="theme === 'b'"
                    @click="onToggleTheme"
                >
                    <span class="theme-toggle__track">
                        <span class="theme-toggle__label theme-toggle__label--on">
                            <img src="/Home/Darkmode.webp" alt="">
                        </span>
                        <span class="theme-toggle__label theme-toggle__label--off">
                            <img src="/Home/Lightmode.webp" alt="">
                        </span>
                        <span class="theme-toggle__thumb"></span>
                    </span>
                </button>

                <form action="">
                    <input type="text" placeholder="Search..." />
                    <button type="button">
                        <img :src="theme === 'b' ? '/Logo&Icon/Income Statement & Withdrawal/Icon_search_gary.webp' : '/Logo&Icon/Income Statement & Withdrawal/Icon_search.webp'" alt="" />
                    </button>
                </form>

                <div class="btn-group login">
                    <button class="login-btn" type="button" @click="showLogin = true">Login</button>
                    <button class="signup-btn" type="button" @click="showSignup = true">Sign Up</button>
                    <button class="member-btn" type="button"><img :src="theme === 'b' ? '/Home/Icon_noti_dark.webp' : '/Home/Icon_noti.webp'" alt="" /></button>
                    <button class="member-btn member-menu" type="button" @click="showMemberMenu = true">
                        <img :src="theme === 'b' ? '/Home/Icon_member_gary.webp' : '/Home/Icon_member_green.webp'" alt="" />
                    </button>
                    <button class="member-btn none" type="button" @click="showPurchase = true">
                        <img :src="theme === 'b' ? '/Home/Icon_topup_diamond_dark.webp' : '/Home/Icon_topup_diamond.webp'" alt="" />
                    </button>
                </div>
            </div>
        </div>

        <div class="tag-inner" :class="{ scroll: isScrolled }">
            <Swiper :modules="modules" :loop="false" :autoplay="false" :slides-per-view="'auto'" :free-mode="true"
                :space-between="32" :breakpoints="{ 0: { spaceBetween: 16 }, 576: { spaceBetween: 32 } }"
                class="creator-swiper" a11y>
                <SwiperSlide v-for="t in tagNames" :key="t.tagName">
                    <router-link :to="t.webLink" class="web-link">{{ t.tagName }}</router-link>
                </SwiperSlide>
            </Swiper>
        </div>
    </header>

    <!-- Login Modal -->
    <BaseModal :show="showLogin" modalClass="login" title="Welcome back !" @close="showLogin = false">
        <router-link class="google-btn" to="">
            Login with GOOGLE <img src="/Logo&Icon/Logo/Icon_google.webp" alt="" />
        </router-link>

        <div class="or-box"><i></i>OR<i></i></div>

        <form @submit.prevent="handleLogin">
            <input type="email" placeholder="Enter your email" required />
            <input type="password" placeholder="Enter your password" required />

            <div class="check-group">
                <label>
                    <input type="checkbox" id="rememberMe" />
                    <span>Remember me?</span>
                </label>
                <router-link to="">Forgot Password?</router-link>
            </div>

            <button type="submit" class="custom-btn">Login</button>

            <div class="change-modal-group">
                Have an account?
                <router-link to="" @click.prevent="showLogin = false; showSignup = true">Sign Up Now</router-link>
            </div>
        </form>
    </BaseModal>

    <!-- Signup Modal -->
    <BaseModal :show="showSignup" modalClass="signup" title="Create an account for FREE" @close="showSignup = false">
        <router-link class="google-btn" to="">
            Sign Up with GOOGLE <img src="/Logo&Icon/Logo/Icon_google.webp" alt="" />
        </router-link>

        <div class="or-box"><i></i>OR<i></i></div>

        <form @submit.prevent="handleSignup">
            <input type="email" placeholder="Enter your email" required />
            <input type="password" placeholder="Enter your password" required />

            <div class="captcha-box">
                <input class="captcha-input" type="number" placeholder="Captcha" required />
                <div class="captcha-num"><img src="" alt="Captcha Number" /></div>
            </div>

            <button type="submit" class="custom-btn">Create Account</button>

            <div class="change-modal-group">
                <router-link to="" @click.prevent="showLogin = true; showSignup = false">Back to login page</router-link>
            </div>
        </form>
    </BaseModal>

    <!-- ✅ Purchase Modal（已抽出） -->
    <Modal :show="showPurchase" :diamond="diamond" @close="showPurchase = false" @buy="handlePurchaseBuy" />

    <!-- 一進網站就會跑的警告彈窗 -->
    <WarningModal title="คุณแน่ใจว่าต้องการเข้าชมเว็บไซต์?"
        message="เนื้อหาในเว็บไซต์ต่อไปนี้ <br> ไม่เหมาะสมแก่เด็กและเยาวชนอายุต่ำกว่า 18 ปี" cookieKey="dailyWarning" />

    <Teleport to="body">
        <transition name="member-slide">
            <div v-if="showMemberMenu" class="member-menu-backdrop" @click.self="showMemberMenu = false">
                <div class="member-menu-panel">
                    <div class="member-menu-body">
                        <div class="member-information-item">
                            <img src="/Logo&Icon/Member/Icon_member_blue.webp" alt="" />
                            <span>@Member01</span>
                        </div>

                        <div class="member-menu-group">
                            <router-link to="/eventNews" class="new-btn">Event News</router-link>
                        </div>

                        <div class="member-menu-group">
                            <div class="separator"><i></i>Member<i></i></div>

                            <router-link to="/member" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_edit_profile_gary.webp' : '/Logo&Icon/Member/Icon_edit_profile.webp'" alt="" />Edit Profile
                            </router-link>

                            <router-link to="/favorite" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_my_favorite_gary.webp' : '/Logo&Icon/Member/Icon_my_favorite.webp'" alt="" />My Favorite
                            </router-link>

                            <router-link to="/purchase" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_my_purchase_gary.webp' : '/Logo&Icon/Member/Icon_my_purchase.webp'" alt="" />My Purchase
                            </router-link>

                            <button type="button" class="member-menu-item" @click="showPurchase = true">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_buy_diamond_gary.webp' : '/Logo&Icon/Member/Icon_buy_diamond.webp'" alt="" />Buy Diamond
                            </button>
                        </div>

                        <div v-if="isCreator" class="member-menu-group">
                            <div class="separator"><i></i>Creator<i></i></div>

                            <router-link to="/clips-management" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_clips_management_gary.webp' : '/Logo&Icon/Member/Icon_clips_management.webp'" alt="" />Clips Management
                            </router-link>

                            <router-link to="/pending-review" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_pending_review_gary.webp' : '/Logo&Icon/Member/Icon_pending_review.webp'" alt="" />Pending Review
                            </router-link>

                            <router-link to="/income-statement" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_income_statement_gary.webp' : '/Logo&Icon/Member/Icon_income_statement.webp'" alt="" />Income Statemant
                            </router-link>

                            <router-link to="/withdrawal" class="member-menu-item">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_withdrawal_gary.webp' : '/Logo&Icon/Member/Icon_withdrawal.webp'" alt="" />Withdrawal
                            </router-link>
                        </div>

                        <div class="member-menu-group">
                            <div class="separator"><i></i></div>
                            <button type="button" class="member-menu-item" @click="handleLogout">
                                <img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_logout_gary.webp' : '/Logo&Icon/Member/Icon_logout.webp'" alt="" />Log Out
                            </button>
                            <a href="#" class="member-menu-item"><img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_language_gary.webp' : '/Logo&Icon/Member/Icon_language.webp'" alt="" />Language</a>
                        </div>

                        <button class="close-btn" type="button" @click="showMemberMenu = false">
                            Close<img :src="theme === 'b' ? '/Logo&Icon/Member/Icon_close_tab_dark.webp' : '/Logo&Icon/Member/Icon_close_tab.webp'" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>

    <button class="mode-btn" type="button" @click="toggleMode">
        {{ modeLabel }}
    </button>

</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed, inject } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules'
import BaseModal from './BaseModal.vue'
import WarningModal from './WarningModal.vue'
import Modal from './Modal.vue'
import { getMode, setMode } from '../stores/mode'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// ✅ theme (從 main.js provide)
const theme = inject('theme') 
const toggleTheme = inject('toggleTheme') 

// mode
const mode = ref(getMode())
const isCreator = computed(() => mode.value === 'creator')
const modeLabel = computed(() => (mode.value === 'creator' ? 'Creator' : 'Member'))

function toggleMode() {
    const next = mode.value === 'creator' ? 'member' : 'creator'
    setMode(next)
    mode.value = next
    window.location.reload()
}

function onToggleTheme() {
  // 1) 如果有從 main.js 注入的 toggleTheme，就用它
    if (typeof toggleTheme === 'function') {
        toggleTheme()
        return
    }

    // 2) 沒有注入也沒關係：自己直接切 html data-theme + localStorage
    const current = document.documentElement.getAttribute('data-theme') || 'a'
    const next = current === 'a' ? 'b' : 'a'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)

    // 如果 theme 注入存在，順便同步（避免 template 顯示不更新）
    if (theme && typeof theme === 'object' && 'value' in theme) {
        theme.value = next
    }
}


// scroll header
const isScrolled = ref(false)
function handleScroll() {
    isScrolled.value = window.scrollY > 1
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

const modules = [Navigation, Pagination, Autoplay, A11y]
const tagNames = [
    { tagName: 'AV', webLink: '/av' },
    { tagName: 'Clips', webLink: '/clips' },
    { tagName: 'Shorts', webLink: '/short-play' },
    { tagName: 'Creators', webLink: '/creator-list' },
    { tagName: 'Event News', webLink: '/eventNews' },
    { tagName: 'Become Creator', webLink: '/become-creator' },
    { tagName: 'Popular Clips', webLink: '/popular-clips' },
    { tagName: 'Hot Girls', webLink: '/hot-girls' },
    { tagName: 'Contact Us', webLink: '/contact-us' },
]

// modals
const showLogin = ref(false)
const showSignup = ref(false)
const showPurchase = ref(false)
const showMemberMenu = ref(false)

// diamond
const diamond = ref(10)

// 防止多個 modal 同時開
watch(showLogin, (v) => {
    if (v) {
        showSignup.value = false
        showPurchase.value = false
    }
})
watch(showSignup, (v) => {
    if (v) {
        showLogin.value = false
        showPurchase.value = false
    }
})
watch(showPurchase, (v) => {
    if (v) {
        showLogin.value = false
        showSignup.value = false
    }
})

// Login form state
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')
const signupEmail = ref('')
const signupPassword = ref('')

// handlers
const handleLogin = async (e) => {
    loginError.value = ''
    const form = e.target
    const email = form.querySelector('input[type="email"]').value
    const password = form.querySelector('input[type="password"]').value
    const ok = await authStore.login(email, password)
    if (ok) {
        showLogin.value = false
    } else {
        loginError.value = authStore.error || 'Login failed'
    }
}
const handleSignup = async (e) => {
    const form = e.target
    const email = form.querySelector('input[type="email"]').value
    const password = form.querySelector('input[type="password"]').value
    const ok = await authStore.register({ email, password, username: email.split('@')[0] })
    if (ok) showSignup.value = false
}

const handleLogout = () => {
    authStore.logout()
    showMemberMenu.value = false
}

// ✅ 任何彈窗開啟就鎖住 body scroll
const isAnyOverlayOpen = computed(() => {
    return showLogin.value || showSignup.value || showPurchase.value || showMemberMenu.value
})

let originalBodyOverflow = ''
watch(isAnyOverlayOpen, (open) => {
    if (open) {
        originalBodyOverflow = document.body.style.overflow || ''
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = originalBodyOverflow
    }
})
onBeforeUnmount(() => {
    document.body.style.overflow = originalBodyOverflow
})

// ✅ PurchaseModal buy event
function handlePurchaseBuy(payload) {
    // payload = { pack, currency, amount }
    console.log('Purchase BUY:', payload)
    // TODO: call API / payment flow
}
</script>