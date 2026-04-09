<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="upload-short-page">
                <div class="title-box">
                    <h1>Upload Short</h1>
                </div>

                <div class="hint-bar">
                    <span class="icon">ⓘ</span>
                    <span class="text">How to upload your video.</span>
                </div>

                <form class="short-form" @submit.prevent="handleSubmit">
                    <div class="form-grid">
                        <div class="left-column">
                            <div class="field">
                                <label class="label">Name</label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.name" placeholder="Your short name" required />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Tag</label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.tag" placeholder="ex: Sexy,Naughty,Bitchy" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Short type</label>
                                <div class="input-wrap select-wrap" @click="toggleShortTypeDropdown">
                                    <div class="select-display">
                                        <span>{{ form.shortType || "Please select" }}</span>
                                        <span class="select-arrow">▼</span>
                                    </div>

                                    <ul v-if="showShortTypeDropdown" class="select-menu" @click.stop>
                                        <li v-for="option in shortTypeOptions" :key="option" class="select-option"
                                            :class="{ active: option === form.shortType }"
                                            @click="selectShortType(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">
                                    Description
                                    <span class="hint">(The Maximum is 255.)</span>
                                </label>
                                <div class="input-wrap textarea-wrap">
                                    <textarea v-model="form.description" rows="5" maxlength="255"
                                        placeholder="Lorem ipsum dolor sit amet consectetur..."></textarea>
                                </div>
                            </div>

                            <div class="field last">
                                <label class="label">Publish Status</label>
                                <div class="input-wrap select-wrap" @click="togglePublishStatusDropdown">
                                    <div class="select-display">
                                        <span>{{ form.publishStatus || "Please select" }}</span>
                                        <span class="select-arrow">▼</span>
                                    </div>

                                    <ul v-if="showPublishStatusDropdown" class="select-menu" @click.stop>
                                        <li v-for="option in publishStatusOptions" :key="option" class="select-option"
                                            :class="{ active: option === form.publishStatus }"
                                            @click="selectPublishStatus(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="right-column">
                            <div class="field last">
                                <label class="label">
                                    Short File
                                    <span class="hint">(Maximum size is 500MB)</span>
                                </label>

                                <div class="upload-box" @click="triggerFileInput">
                                    <input ref="fileInput" type="file" class="file-input" accept="video/*" @change="onFileChange" />
                                    <div class="upload-inner">
                                        <div class="upload-icon">📁</div>
                                        <div class="upload-text">
                                            <span v-if="!fileName">Upload Your Short File</span>
                                            <span v-else>{{ fileName }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="agreements">
                        <span> Please tick after reading the upload specification </span>
                        <label class="checkbox sub">
                            <input type="checkbox" v-model="form.acceptTerms" />
                            <span>อ่านข้อเงื่อนไขเรียบร้อยแล้ว</span>
                        </label>
                    </div>

                    <div class="btn-row">
                        <button type="submit" class="submit-btn">Submit Your Video</button>
                    </div>
                </form>
            </section>
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from "../components/HeaderBar.vue";
import AppFooter from "../components/AppFooter.vue";
import { reactive, ref, computed } from "vue";

const form = reactive({
    name: "",
    tag: "",
    shortType: "",
    description: "",
    publishStatus: "",
    acceptTerms: false,
    file: null,
});

const fileInput = ref(null);

const fileName = computed(() => (form.file ? form.file.name : ""));

const triggerFileInput = () => {
    fileInput.value?.click();
};

const onFileChange = (e) => {
    const [file] = e.target.files;
    form.file = file || null;
};

/* ==== 自訂下拉 Short type / Publish Status ==== */
const shortTypeOptions = ["Sexy", "Cute", "Funny"];
const publishStatusOptions = ["Draft", "Pending", "Published"];

const showShortTypeDropdown = ref(false);
const showPublishStatusDropdown = ref(false);

const toggleShortTypeDropdown = () => {
    showShortTypeDropdown.value = !showShortTypeDropdown.value;
    if (showShortTypeDropdown.value) {
        showPublishStatusDropdown.value = false;
    }
};

const togglePublishStatusDropdown = () => {
    showPublishStatusDropdown.value = !showPublishStatusDropdown.value;
    if (showPublishStatusDropdown.value) {
        showShortTypeDropdown.value = false;
    }
};

const selectShortType = (option) => {
    form.shortType = option;
    showShortTypeDropdown.value = false;
};

const selectPublishStatus = (option) => {
    form.publishStatus = option;
    showPublishStatusDropdown.value = false;
};
/* ============================================ */

const handleSubmit = () => {
    if (!form.file) {
        alert("Please upload your short file first.");
        return;
    }

    console.log("Submit short form:", { ...form });
    alert("Short uploaded (demo).");
};
</script>