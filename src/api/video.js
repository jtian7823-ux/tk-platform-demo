import http from './index'

export const videoApi = {
  list: (params) => http.get('/videos', { params }),
  detail: (id) => http.get(`/videos/${id}`),
  purchase: (id) => http.post(`/videos/${id}/purchase`),
  clips: (params) => http.get('/clips', { params }),
  favorites: () => http.get('/member/favorites'),
  purchases: () => http.get('/member/purchases'),
}
