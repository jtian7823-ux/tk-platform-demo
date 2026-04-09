<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="apply-creator-page">
                <div class="title-box">
                    <h1>Upload Short</h1>
                </div>

                <div class="apply-creator-main">
                    <div class="hint-bar">
                        <span class="icon">ⓘ</span>
                        <span class="text">How to become a creator.</span>
                    </div>

                    <!-- 表單 -->
                    <form class="apply-form" @submit.prevent="handleSubmit">
                        <!-- 第一列：Account / Birthday -->
                        <div class="form-row">
                            <div class="field">
                                <label class="label">Account*</label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.account" placeholder="Your account here"
                                        required />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Birthday*</label>
                                <div class="input-wrap date-input">
                                    <input type="date" v-model="form.birthday" required />
                                </div>
                            </div>
                        </div>

                        <!-- 第二列：Nick Name / Creator Type -->
                        <div class="form-row">
                            <div class="field">
                                <label class="label">Nick Name*</label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.nickName" placeholder="Your nick name here"
                                        required />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Creator Type</label>
                                <div class="input-wrap select-wrap" @click="toggleCreatorTypeDropdown">
                                    <div class="select-display">
                                        <span>{{ form.creatorType || 'Please select' }}</span>
                                        <span class="select-arrow">▼</span>
                                    </div>

                                    <ul v-if="showCreatorTypeDropdown" class="select-menu" @click.stop>
                                        <li v-for="option in creatorTypeOptions" :key="option" class="select-option"
                                            :class="{ active: option === form.creatorType }"
                                            @click="selectCreatorType(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 第三列：Real Name / Country ID -->
                        <div class="form-row">
                            <div class="field">
                                <label class="label">
                                    Real Name*
                                </label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.realName" placeholder="Your real name here"
                                        required />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Country ID</label>
                                <div class="input-wrap select-wrap" @click="toggleCountryDropdown">
                                    <div class="select-display">
                                        <span>{{ form.countryId || 'Please select' }}</span>
                                        <span class="select-arrow">▼</span>
                                    </div>

                                    <ul v-if="showCountryDropdown" class="select-menu" @click.stop>
                                        <li v-for="option in countryOptions" :key="option" class="select-option"
                                            :class="{ active: option === form.countryId }"
                                            @click="selectCountry(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 社群連結（按鈕樣式） -->
                        <div class="social-list">
                            <button type="button" class="social-btn facebook">
                                <span class="icon"><img src="/Logo&Icon/Logo/Logo_FB.webp" alt=""></span>
                                <span>Facebook</span>
                            </button>
                            <button type="button" class="social-btn instagram">
                                <span class="icon"><img src="/Logo&Icon/Logo/Logo_IG.webp" alt=""></span>
                                <span>Instagram</span>
                            </button>
                            <button type="button" class="social-btn x">
                                <span class="icon"><img src="/Logo&Icon/Logo/Logo_X.webp" alt=""></span>
                                <span>X</span>
                            </button>
                            <button type="button" class="social-btn youtube">
                                <span class="icon"><img src="/Logo&Icon/Logo/logos_youtube.webp" alt=""></span>
                                <span>Youtube</span>
                            </button>
                        </div>

                        <hr class="divider" />

                        <!-- 身分證上傳 -->
                        <div class="id-grid">
                            <div class="id-field">
                                <div class="id-label">Identity Card</div>
                                <div class="upload-box" @click="triggerIdCardInput">
                                    <input ref="idCardInput" type="file" class="file-input" accept="image/*"
                                        @change="onIdCardChange" />
                                    <div class="upload-inner">
                                        <div class="upload-icon">📷</div>
                                        <div class="upload-text">
                                            <span v-if="!idCardFileName">Upload Photo</span>
                                            <span v-else>{{ idCardFileName }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="id-field">
                                <div class="id-label">Handheld ID Photo</div>
                                <div class="upload-box" @click="triggerHandheldInput">
                                    <input ref="handheldInput" type="file" class="file-input" accept="image/*"
                                        @change="onHandheldChange" />
                                    <div class="upload-inner">
                                        <div class="upload-icon">📷</div>
                                        <div class="upload-text">
                                            <span v-if="!handheldFileName">Upload Photo</span>
                                            <span v-else>{{ handheldFileName }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 送出按鈕 -->
                        <div class="btn-row">
                            <button type="submit" class="submit-btn">
                                Apply for Creator
                            </button>
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
import { reactive, ref, computed } from 'vue'

const form = reactive({
    account: '',
    birthday: '',
    nickName: '',
    creatorType: '',
    realName: '',
    countryId: '',
    idCardFile: null,
    handheldFile: null,
})

/* 自訂下拉：Creator Type & Country ID */
const creatorTypeOptions = ['Model', 'Cosplayer', 'Gamer', 'Other']
const countryOptions = ['Thailand', 'Japan', 'Korea', 'USA']

const showCreatorTypeDropdown = ref(false)
const showCountryDropdown = ref(false)

const toggleCreatorTypeDropdown = () => {
    showCreatorTypeDropdown.value = !showCreatorTypeDropdown.value
    if (showCreatorTypeDropdown.value) {
        showCountryDropdown.value = false
    }
}

const toggleCountryDropdown = () => {
    showCountryDropdown.value = !showCountryDropdown.value
    if (showCountryDropdown.value) {
        showCreatorTypeDropdown.value = false
    }
}

const selectCreatorType = (option) => {
    form.creatorType = option
    showCreatorTypeDropdown.value = false
}

const selectCountry = (option) => {
    form.countryId = option
    showCountryDropdown.value = false
}

/* 上傳身分證 */
const idCardInput = ref(null)
const handheldInput = ref(null)

const idCardFileName = computed(() =>
    form.idCardFile ? form.idCardFile.name : ''
)
const handheldFileName = computed(() =>
    form.handheldFile ? form.handheldFile.name : ''
)

const triggerIdCardInput = () => {
    idCardInput.value?.click()
}

const triggerHandheldInput = () => {
    handheldInput.value?.click()
}

const onIdCardChange = (e) => {
    const [file] = e.target.files
    form.idCardFile = file || null
}

const onHandheldChange = (e) => {
    const [file] = e.target.files
    form.handheldFile = file || null
}

/* 送出 */
const handleSubmit = () => {
    if (!form.idCardFile || !form.handheldFile) {
        alert('Please upload both Identity Card and Handheld ID photo.')
        return
    }

    console.log('Apply creator form:', { ...form })
    alert('Apply for creator (demo).')
}


</script>