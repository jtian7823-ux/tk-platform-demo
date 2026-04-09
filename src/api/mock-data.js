// Mock data embedded for GitHub Pages static deployment
// In production with real backend, replace api/index.js to use real HTTP calls

export const mockCreators = [
  { id: 1, username: "alice_live", nickname: "Alice 愛麗絲", avatar: "https://i.pravatar.cc/150?img=47", cover_image: "https://picsum.photos/seed/alice/800/300", bio: "每天晚上9點開播，愛聊天、愛唱歌 🎵", category: "聊天", follower_count: 12480, is_live: true, viewer_count: 342, is_verified: true },
  { id: 2, username: "bella_dance", nickname: "Bella 貝拉", avatar: "https://i.pravatar.cc/150?img=32", cover_image: "https://picsum.photos/seed/bella/800/300", bio: "舞蹈老師，專業跳舞🕺 舞蹈教學 + 直播互動", category: "舞蹈", follower_count: 8930, is_live: false, viewer_count: 0, is_verified: true },
  { id: 3, username: "cherry_sing", nickname: "Cherry 小櫻", avatar: "https://i.pravatar.cc/150?img=56", cover_image: "https://picsum.photos/seed/cherry/800/300", bio: "音樂系畢業，原創歌曲創作 🎤", category: "音樂", follower_count: 5210, is_live: true, viewer_count: 128, is_verified: false },
  { id: 4, username: "diana_hot", nickname: "Diana 黛安娜", avatar: "https://i.pravatar.cc/150?img=44", cover_image: "https://picsum.photos/seed/diana/800/300", bio: "生活分享、美妝教學 💄", category: "美妝", follower_count: 22100, is_live: false, viewer_count: 0, is_verified: true },
  { id: 5, username: "eva_fitness", nickname: "Eva 健身女神", avatar: "https://i.pravatar.cc/150?img=29", cover_image: "https://picsum.photos/seed/eva/800/300", bio: "健身教練，每天直播健身 💪", category: "健身", follower_count: 15670, is_live: true, viewer_count: 89, is_verified: true },
  { id: 6, username: "fiona_game", nickname: "Fiona 電競女神", avatar: "https://i.pravatar.cc/150?img=38", cover_image: "https://picsum.photos/seed/fiona/800/300", bio: "電競主播 🎮 每晚直播遊戲", category: "遊戲", follower_count: 9340, is_live: false, viewer_count: 0, is_verified: false },
]

export const mockVideos = [
  { id: 1, creator_id: 1, creator_nickname: "Alice 愛麗絲", creator_avatar: "https://i.pravatar.cc/150?img=47", title: "Alice 最新作品 Vol.01", cover_image: "https://picsum.photos/seed/v1/400/225", duration: 1820, view_count: 5230, like_count: 892, coin_price: 0, is_free: true, video_type: 1, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", published_at: "2026-04-01T10:00:00Z" },
  { id: 2, creator_id: 2, creator_nickname: "Bella 貝拉", creator_avatar: "https://i.pravatar.cc/150?img=32", title: "Bella 舞蹈教學 — 基礎篇", cover_image: "https://picsum.photos/seed/v2/400/225", duration: 2400, view_count: 3120, like_count: 541, coin_price: 50, is_free: false, video_type: 1, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", published_at: "2026-04-03T14:00:00Z" },
  { id: 3, creator_id: 3, creator_nickname: "Cherry 小櫻", creator_avatar: "https://i.pravatar.cc/150?img=56", title: "Cherry 原創歌曲 — 春天", cover_image: "https://picsum.photos/seed/v3/400/225", duration: 240, view_count: 8901, like_count: 2130, coin_price: 0, is_free: true, video_type: 3, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", published_at: "2026-04-05T09:00:00Z" },
  { id: 4, creator_id: 4, creator_nickname: "Diana 黛安娜", creator_avatar: "https://i.pravatar.cc/150?img=44", title: "Diana 美妝教學 — 韓系妝容", cover_image: "https://picsum.photos/seed/v4/400/225", duration: 3600, view_count: 12450, like_count: 3210, coin_price: 100, is_free: false, video_type: 1, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", published_at: "2026-04-06T18:00:00Z" },
  { id: 5, creator_id: 5, creator_nickname: "Eva 健身女神", creator_avatar: "https://i.pravatar.cc/150?img=29", title: "Eva 30分鐘全身訓練", cover_image: "https://picsum.photos/seed/v5/400/225", duration: 1800, view_count: 7830, like_count: 1890, coin_price: 0, is_free: true, video_type: 1, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", published_at: "2026-04-07T07:00:00Z" },
  { id: 6, creator_id: 1, creator_nickname: "Alice 愛麗絲", creator_avatar: "https://i.pravatar.cc/150?img=47", title: "Alice 專屬粉絲福利影片", cover_image: "https://picsum.photos/seed/v6/400/225", duration: 900, view_count: 4210, like_count: 1230, coin_price: 200, is_free: false, video_type: 2, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", published_at: "2026-04-08T20:00:00Z" },
]

export const mockLiveRooms = [
  { id: 1, creator_id: 1, creator_nickname: "Alice 愛麗絲", creator_avatar: "https://i.pravatar.cc/150?img=47", title: "Alice 今晚直播聊天室 🎉", cover_image: "https://picsum.photos/seed/live1/800/450", category: "聊天", status: 1, viewer_count: 342, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
  { id: 2, creator_id: 3, creator_nickname: "Cherry 小櫻", creator_avatar: "https://i.pravatar.cc/150?img=56", title: "Cherry 音樂直播 🎵", cover_image: "https://picsum.photos/seed/live2/800/450", category: "音樂", status: 1, viewer_count: 128, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
  { id: 3, creator_id: 5, creator_nickname: "Eva 健身女神", creator_avatar: "https://i.pravatar.cc/150?img=29", title: "Eva 晨間健身直播 💪", cover_image: "https://picsum.photos/seed/live3/800/450", category: "健身", status: 1, viewer_count: 89, hls_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
]

export const mockGifts = [
  { id: 1, name: "玫瑰", icon: "🌹", coin_cost: 1 },
  { id: 2, name: "心心", icon: "❤️", coin_cost: 5 },
  { id: 3, name: "炸彈", icon: "💣", coin_cost: 10 },
  { id: 4, name: "飛機", icon: "✈️", coin_cost: 50 },
  { id: 5, name: "火箭", icon: "🚀", coin_cost: 100 },
  { id: 6, name: "跑車", icon: "🏎️", coin_cost: 500 },
  { id: 7, name: "城堡", icon: "🏰", coin_cost: 1000 },
]

export const mockUser = {
  id: 99, username: "demo_user", nickname: "Demo 用戶",
  email: "demo@tk.com", avatar: "https://i.pravatar.cc/150?img=12",
  role: 1, coin_balance: 500, token: "demo-jwt-token-12345",
}

// Simulate async API response
const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export const mockApi = {
  async getCreators(params = {}) {
    await delay()
    let list = [...mockCreators]
    if (params.is_live === '1') list = list.filter(c => c.is_live)
    return { code: 0, data: { list, total: list.length } }
  },
  async getCreator(id) {
    await delay()
    const creator = mockCreators.find(c => c.id === parseInt(id))
    if (!creator) return { code: 404, message: '不存在' }
    return { code: 0, data: { ...creator, videos: mockVideos.filter(v => v.creator_id === creator.id) } }
  },
  async getVideos(params = {}) {
    await delay()
    return { code: 0, data: { list: mockVideos, total: mockVideos.length } }
  },
  async getVideo(id) {
    await delay()
    const video = mockVideos.find(v => v.id === parseInt(id))
    return { code: 0, data: video }
  },
  async getLiveRooms() {
    await delay()
    return { code: 0, data: { list: mockLiveRooms, total: mockLiveRooms.length } }
  },
  async login(username, password) {
    await delay(500)
    return { code: 0, data: { ...mockUser, username }, message: '登入成功' }
  },
}
