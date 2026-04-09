import http from './index'

export const liveApi = {
  rooms: () => http.get('/live/rooms'),
  roomDetail: (id) => http.get(`/live/rooms/${id}`),
  createRoom: (data) => http.post('/live/rooms', data),
  chat: (roomId) => http.get(`/live/rooms/${roomId}/chat`),
  sendChat: (roomId, message) => http.post(`/live/rooms/${roomId}/chat`, { message }),
  gifts: () => http.get('/gifts'),
  sendGift: (data) => http.post('/gifts/send', data),
}
