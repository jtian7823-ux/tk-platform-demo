<template>
    <Teleport to="body">
        <div v-if="show" class="modal-backdrop" @click.self="onClose">
            <div class="modal" :class="modalClass">
                <div class="modal-header" v-if="!hideHeader">
                    <img class="logo" :src="theme === 'b' ? '/Logo&Icon/Logo/Logo_gary.webp' : '/Logo&Icon/Logo/Logo_green.webp'" alt="">
                    <h3>{{ title }}</h3>
                    <!-- <button class="modal-close" @click="onClose">✕</button> -->
                </div>
                <div class="modal-body" :class="{ 'no-header': hideHeader }">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { inject } from 'vue'

const theme = inject('theme')

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    modalClass: {
        type: [String, Array, Object],
        default: "",
    },
    title: {
        type: String,
        default: "",
    },

    hideHeader: {
        type: Boolean,
        default: false,
    },

    hideTitle: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(["close"])

const onClose = () => {
    emit("close")
}
</script>