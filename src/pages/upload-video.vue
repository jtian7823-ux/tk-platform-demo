<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <section class="upload-video-page">
                <div class="title-box">
                    <h1>Upload Video</h1>
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
                                <label class="label">Amount</label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.amount" placeholder="Your video price" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Tag</label>
                                <div class="input-wrap">
                                    <input type="text" v-model="form.tag" placeholder="ex: Sexy,Naughty,Bitchy" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Video type</label>
                                <div class="input-wrap select-wrap" @click="togglevideoTypeDropdown">
                                    <div class="select-display">
                                        <span>{{ form.videoType || "Please select" }}</span>
                                        <span class="select-arrow">▼</span>
                                    </div>

                                    <ul v-if="showvideoTypeDropdown" class="select-menu" @click.stop>
                                        <li v-for="option in videoTypeOptions" :key="option" class="select-option"
                                            :class="{ active: option === form.videoType }"
                                            @click="selectvideoType(option)">
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
                            <!-- Video Cover Photo -->
                            <div class="field">
                                <label class="label">
                                    Video Cover Photo
                                    <span class="hint">(Image size : 480x270)</span>
                                </label>

                                <div class="upload-box" @click="triggerCoverInput">
                                    <input ref="coverInput" type="file" class="file-input" accept="image/*"
                                        @change="onCoverChange" />
                                    <div class="upload-inner">
                                        <div class="upload-icon">📁</div>
                                        <div class="upload-text">
                                            <span v-if="!coverFileName">Upload Your Video Cover Photo</span>
                                            <span v-else>{{ coverFileName }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Video File -->
                            <div class="field last">
                                <label class="label">
                                    Video File
                                    <span class="hint">(Maximum size is 500MB)</span>
                                </label>

                                <div class="upload-box" @click="triggerVideoInput">
                                    <input ref="videoInput" type="file" class="file-input" accept="video/*"
                                        @change="onVideoChange" />
                                    <div class="upload-inner">
                                        <div class="upload-icon">📁</div>
                                        <div class="upload-text">
                                            <span v-if="!videoFileName">Upload Your Video File</span>
                                            <span v-else>{{ videoFileName }}</span>
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
                        <button type="submit" class="submit-btn">Submit Your Short</button>
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
    amount: "",
    tag: "",
    videoType: "",
    description: "",
    publishStatus: "",
    acceptTerms: false,
    coverFile: null,
    videoFile: null,
});

const coverInput = ref(null)
const videoInput = ref(null)

const coverFileName = computed(() =>
    form.coverFile ? form.coverFile.name : ''
)
const videoFileName = computed(() =>
    form.videoFile ? form.videoFile.name : ''
)

const triggerCoverInput = () => {
    coverInput.value?.click()
}

const triggerVideoInput = () => {
    videoInput.value?.click()
}

const onCoverChange = (e) => {
    const [file] = e.target.files
    form.coverFile = file || null
}

const onVideoChange = (e) => {
    const [file] = e.target.files
    form.videoFile = file || null
}

/* ==== 自訂下拉 Short type / Publish Status ==== */
const videoTypeOptions = ["Sexy", "Cute", "Funny"];
const publishStatusOptions = ["Draft", "Pending", "Published"];

const showvideoTypeDropdown = ref(false);
const showPublishStatusDropdown = ref(false);

const togglevideoTypeDropdown = () => {
    showvideoTypeDropdown.value = !showvideoTypeDropdown.value;
    if (showvideoTypeDropdown.value) {
        showPublishStatusDropdown.value = false;
    }
};

const togglePublishStatusDropdown = () => {
    showPublishStatusDropdown.value = !showPublishStatusDropdown.value;
    if (showPublishStatusDropdown.value) {
        showvideoTypeDropdown.value = false;
    }
};

const selectvideoType = (option) => {
    form.videoType = option;
    showvideoTypeDropdown.value = false;
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