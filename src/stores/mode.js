// src/stores/mode.js
const KEY = 'user_mode' // 'member' | 'creator'

export function getMode() {
    return localStorage.getItem(KEY) || 'member'
}

export function setMode(mode) {
    localStorage.setItem(KEY, mode)
}
