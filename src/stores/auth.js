import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('tk_user') || 'null'))
  const token = ref(localStorage.getItem('tk_token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const isCreator = computed(() => user.value?.role === 2)
  const coinBalance = computed(() => user.value?.coin_balance || 0)

  async function login(username, password) {
    loading.value = true
    error.value = null
    try {
      const res = await authApi.login({ username, password })
      user.value = res.data
      token.value = res.data.token
      localStorage.setItem('tk_token', res.data.token)
      localStorage.setItem('tk_user', JSON.stringify(res.data))
      return true
    } catch (e) {
      error.value = e.message || '登入失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data) {
    loading.value = true
    error.value = null
    try {
      const res = await authApi.register(data)
      user.value = res.data
      token.value = res.data.token
      localStorage.setItem('tk_token', res.data.token)
      localStorage.setItem('tk_user', JSON.stringify(res.data))
      return true
    } catch (e) {
      error.value = e.message || '註冊失敗'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('tk_token')
    localStorage.removeItem('tk_user')
  }

  async function fetchProfile() {
    if (!token.value) return
    try {
      const res = await authApi.me()
      user.value = res.data
      localStorage.setItem('tk_user', JSON.stringify(res.data))
    } catch (e) {
      // silent fail
    }
  }

  return { user, token, loading, error, isLoggedIn, isCreator, coinBalance, login, register, logout, fetchProfile }
})
