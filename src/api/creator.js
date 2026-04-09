import http from './index'

export const creatorApi = {
  list: (params) => http.get('/creators', { params }),
  detail: (id) => http.get(`/creators/${id}`),
  income: () => http.get('/creator/income'),
  stats: () => http.get('/creator/stats'),
}
