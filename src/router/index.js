// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { getMode } from '../stores/mode'

// 匯入你的頁面（待會我們會建立這些）
import HomePage from '../pages/index.vue'
import CreatorListPage from '../pages/creator-list.vue'
import EventNewsPage from '../pages/event-news.vue'
import NewsPage from '../pages/news-page.vue'
import CreatorPage from '../pages/creator.vue'
import MemberPage from '../pages/member.vue'
import FavoritePage from '../pages/favorite.vue'
import PurchasePage from '../pages/purchase.vue'
import AvPage from '../pages/av.vue'
import ClipsPage from '../pages/clips.vue'
import PopularClipsPage from '../pages/popular-clips.vue'
import HotGirlsPage from '../pages/hot-girls.vue'
import PlayPage from '../pages/play.vue'
import AvPlayPage from '../pages/av-play.vue'
import ShortPlayPage from '../pages/short-play.vue'
import ClipsManagementPage from '../pages/clips-management.vue'
import ClipsEditPage from '../pages/clips-edit.vue'
import PendingReviewPage from '../pages/pending-review.vue'
import IncomeStatementPage from '../pages/income-statement.vue'
import WithdrawalPage from '../pages/withdrawal.vue'
import SearchResultPage from '../pages/search-result.vue'
import BecomeCreatorPage from '../pages/become-creator.vue'
import LegalNoticePage from '../pages/legal-notice.vue'
import PrivacyPolicyPage from '../pages/privacy-policy.vue'
import FAQPage from '../pages/faq.vue'
import AboutUsPage from '../pages/about-us.vue'
import ContactUsPage from '../pages/contact-us.vue'
import UploadPage from '../pages/upload.vue'
import UploadShortPage from '../pages/upload-short.vue'
import UploadVideoPage from '../pages/upload-video.vue'
import ApplyCreatorPage from '../pages/apply-creator.vue'

// 定義路由對應關係
const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/creator-list', name: 'Creator List', component: CreatorListPage },
    { path: '/eventNews', name: 'Event News', component: EventNewsPage },
    { path: '/eventNews/news-page', name: 'News Page', component: NewsPage },
    { path: '/creator', name: 'Creator', component: CreatorPage },
    { path: '/member', name: 'Member', component: MemberPage },
    { path: '/favorite', name: 'Favorite', component: FavoritePage },
    { path: '/purchase', name: 'Purchase', component: PurchasePage },
    { path: '/av', name: 'AV', component: AvPage },
    { path: '/clips', name: 'Clips', component: ClipsPage },
    { path: '/popular-clips', name: 'Popular Clips', component: PopularClipsPage },
    { path: '/hot-girls', name: 'Hot Girls', component: HotGirlsPage },
    { path: '/play', name: 'Play', component: PlayPage },
    { path: '/av-play', name: 'AV Play', component: AvPlayPage },
    { path: '/short-play', name: 'Short Play', component: ShortPlayPage },
    { path: '/clips-management', name: 'Clips Management', component: ClipsManagementPage, meta: { requireMode: 'creator' } },
    { path: '/clips-edit', name: 'Clips Edit', component: ClipsEditPage, meta: { requireMode: 'creator' } },
    { path: '/pending-review', name: 'Pending Review', component: PendingReviewPage, meta: { requireMode: 'creator' } },
    { path: '/income-statement', name: 'Income Statement', component: IncomeStatementPage, meta: { requireMode: 'creator' } },
    { path: '/withdrawal', name: 'Withdrawal', component: WithdrawalPage, meta: { requireMode: 'creator' } },
    { path: '/search-result', name: 'Search Result', component: SearchResultPage },
    { path: '/become-creator', name: 'Become Creator', component: BecomeCreatorPage },
    { path: '/legal-notice', name: 'Legal Notice', component: LegalNoticePage },
    { path: '/privacy-policy', name: 'Privacy Policy', component: PrivacyPolicyPage },
    { path: '/faq', name: 'FAQ', component: FAQPage },
    { path: '/about-us', name: 'About Us', component: AboutUsPage },
    { path: '/contact-us', name: 'Contact Us', component: ContactUsPage },
    { path: '/upload', name: 'Upload', component: UploadPage, meta: { requireMode: 'creator' } },
    { path: '/upload-short', name: 'Upload Short', component: UploadShortPage, meta: { requireMode: 'creator' } },
    { path: '/upload-video', name: 'Upload Video', component: UploadVideoPage, meta: { requireMode: 'creator' } },
    { path: '/apply-creator', name: 'Apply Creator', component: ApplyCreatorPage },
]

// 建立 router 實例
export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const requireMode = to.meta?.requireMode
    if (!requireMode) return true

    const mode = getMode()
    if (mode !== requireMode) {
        if (to.path === '/apply-creator') return true
        return { path: '/apply-creator', query: { redirect: to.fullPath } }
    }

    return true
})
