<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="clips-edit">
                <div class="title-box">
                    <h1>Clips Edit</h1>
                </div>

                <div class="clip-edit-page">
                    <form class="clip-form" @submit.prevent="submitForm">
                        <!-- 第一列：Name / Publish Status -->
                        <div class="row">
                            <div class="col">
                                <div class="field">
                                    <label class="label">Name</label>
                                    <div class="input-wrap">
                                        <input v-model="form.name" type="text" />
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="field">
                                    <label class="label">Publish Status</label>
                                    <div class="input-wrap select-wrap" @click="toggleStatusDropdown">
                                        <div class="select-display">
                                            <span>{{ form.status }}</span>
                                            <span class="select-arrow">▼</span>
                                        </div>

                                        <ul v-if="showStatusDropdown" class="select-menu" @click.stop>
                                            <li v-for="option in statusOptions" :key="option" class="select-option"
                                                :class="{ active: option === form.status }"
                                                @click="selectStatus(option)">
                                                {{ option }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 第二列：Amount / Cover -->
                        <div class="row">
                            <div class="col">
                                <div class="field">
                                    <label class="label">Amount</label>
                                    <div class="input-wrap">
                                        <input v-model="form.amount" type="number" min="0" />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Tag</label>
                                    <div class="input-wrap">
                                        <input v-model="tagString" type="text" />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Video type</label>
                                    <div class="input-wrap select-wrap" @click="toggleVideoTypeDropdown">
                                        <div class="select-display">
                                            <span>{{ form.sort }}</span>
                                            <span class="select-arrow">▼</span>
                                        </div>

                                        <ul v-if="showVideoTypeDropdown" class="select-menu" @click.stop>
                                            <li v-for="option in videoTypeOptions" :key="option" class="select-option"
                                                :class="{ active: option === form.sort }"
                                                @click="selectVideoType(option)">
                                                {{ option }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="field field-cover">
                                    <label class="label">
                                        Video Cover Photo
                                        <span class="hint">(image size : 480x270)</span>
                                    </label>
                                    <div class="cover-box">
                                        <img :src="form.cover" alt="video cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="row">
                            <div class="col col-full">
                                <div class="field">
                                    <label class="label">
                                        Description
                                        <span class="hint">(The Maximum is 255.)</span>
                                    </label>
                                    <div class="input-wrap textarea-wrap">
                                        <textarea v-model="form.description" rows="5" maxlength="255"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Save 按鈕 -->
                        <div class="btn-row">
                            <button type="submit" class="save-btn">
                                Save
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
    cover: '/Image/Clips_01.webp',
    name: 'คืนนี้หนูอยู่ที่ลาว',
    status: 'Online',
    amount: 100,
    tags: ['Japan', 'NTR', 'MILF', 'Big boob', 'Wife', 'Japan', 'NTR', 'MILF', 'Big boob', 'Wife'],
    sort: 'Sexy',
    description:
        'Lorem ipsum dolor sit amet consectetur. Urna risus leo purus leo risus ac in lacus. Malesuada lobortis lacus malesuada lectus duis in dolor diam pellentesque.',
})

const tagString = computed({
    get() {
        return form.tags.join(', ')
    },
    set(value) {
        form.tags = value
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t) // 去掉空字串
    },
})

// 自訂 dropdown 資料
const statusOptions = ['Online', 'Pending', 'Offline']
const videoTypeOptions = ['Sexy', 'Fun', 'Chill']

const showStatusDropdown = ref(false)
const showVideoTypeDropdown = ref(false)

const toggleStatusDropdown = () => {
    showStatusDropdown.value = !showStatusDropdown.value
    if (showStatusDropdown.value) showVideoTypeDropdown.value = false
}

const toggleVideoTypeDropdown = () => {
    showVideoTypeDropdown.value = !showVideoTypeDropdown.value
    if (showVideoTypeDropdown.value) showStatusDropdown.value = false
}

const selectStatus = (option) => {
    form.status = option
    showStatusDropdown.value = false
}

const selectVideoType = (option) => {
    form.sort = option
    showVideoTypeDropdown.value = false
}

const submitForm = () => {
    console.log('submit:', { ...form })
}

</script>
