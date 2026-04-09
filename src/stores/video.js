import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockApi } from '../api/mock-data'

const videoApi = {
  list: (params) => mockApi.getVideos(params),
  detail: (id) => mockApi.getVideo(id),
  purchase: (id) => Promise.resolve({ code: 0, data: { purchased: true } }),
  clips: (params) => mockApi.getVideos(params),
  favorites: () => mockApi.getVideos(),
  purchases: () => mockApi.getVideos(),
}

export const useVideoStore = defineStore('video', () => {
  const videoList = ref([])
  const clipList = ref([])
  const currentVideo = ref(null)
  const favorites = ref([])
  const purchases = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchVideos(params = {}) {
    isLoading.value = true
    error.value = null
    try {
      const res = await videoApi.list(params)
      videoList.value = res.data.list
      return res.data
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchVideoDetail(id) {
    isLoading.value = true
    try {
      const res = await videoApi.detail(id)
      currentVideo.value = res.data
      return res.data
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function purchaseVideo(id) {
    try {
      const res = await videoApi.purchase(id)
      return res.data
    } catch (e) {
      throw e
    }
  }

  async function fetchClips(params = {}) {
    isLoading.value = true
    try {
      const res = await videoApi.clips(params)
      clipList.value = res.data.list
      return res.data
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFavorites() {
    try {
      const res = await videoApi.favorites()
      favorites.value = res.data.list
    } catch (e) { /* silent */ }
  }

  async function fetchPurchases() {
    try {
      const res = await videoApi.purchases()
      purchases.value = res.data.list
    } catch (e) { /* silent */ }
  }

  return {
    videoList, clipList, currentVideo, favorites, purchases,
    isLoading, error,
    fetchVideos, fetchVideoDetail, purchaseVideo,
    fetchClips, fetchFavorites, fetchPurchases,
  }
})
