import { defineStore } from 'pinia'
import { ref } from 'vue'
import { liveApi } from '../api/live'

export const useLiveStore = defineStore('live', () => {
  const liveRooms = ref([])
  const currentRoom = ref(null)
  const chatMessages = ref([])
  const gifts = ref([])
  const isLoading = ref(false)

  async function fetchRooms() {
    isLoading.value = true
    try {
      const res = await liveApi.rooms()
      liveRooms.value = res.data.list
      return res.data
    } catch (e) {
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchRoomDetail(id) {
    isLoading.value = true
    try {
      const res = await liveApi.roomDetail(id)
      currentRoom.value = res.data
      chatMessages.value = res.data.chat_messages || []
      return res.data
    } catch (e) {
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function sendChat(roomId, message) {
    try {
      const res = await liveApi.sendChat(roomId, message)
      chatMessages.value.push(res.data)
      return res.data
    } catch (e) {
      return null
    }
  }

  async function fetchGifts() {
    try {
      const res = await liveApi.gifts()
      gifts.value = res.data
    } catch (e) { /* silent */ }
  }

  async function sendGift(roomId, giftId, coinAmount) {
    try {
      const res = await liveApi.sendGift({ room_id: roomId, gift_id: giftId, coin_amount: coinAmount })
      return res.data
    } catch (e) {
      throw e
    }
  }

  return {
    liveRooms, currentRoom, chatMessages, gifts, isLoading,
    fetchRooms, fetchRoomDetail, sendChat, fetchGifts, sendGift,
  }
})
