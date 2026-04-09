import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockApi } from '../api/mock-data'

const creatorApi = {
  list: (params) => mockApi.getCreators(params),
  detail: (id) => mockApi.getCreator(id),
}

export const useCreatorStore = defineStore('creator', () => {
  const creatorList = ref([])
  const liveCreators = ref([])
  const currentCreator = ref(null)
  const isLoading = ref(false)

  async function fetchCreators(params = {}) {
    isLoading.value = true
    try {
      const res = await creatorApi.list(params)
      creatorList.value = res.data.list
      liveCreators.value = creatorList.value.filter(c => c.is_live)
      return res.data
    } catch (e) {
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCreatorDetail(id) {
    isLoading.value = true
    try {
      const res = await creatorApi.detail(id)
      currentCreator.value = res.data
      return res.data
    } catch (e) {
      return null
    } finally {
      isLoading.value = false
    }
  }

  return { creatorList, liveCreators, currentCreator, isLoading, fetchCreators, fetchCreatorDetail }
})
