<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <VideoPlayer :video="videoInner">
                <template #video-meta="{ video }">
                    <div class="video-meta av">
                        <div class="creator-row">
                            <div class="creator-info">
                                <p class="video-desc">
                                    {{ video.clipName }}
                                </p>
                                <p class="video-desc">
                                    {{ video.clipTitle }}
                                </p>
                                <div class="creator-top">
                                    <div class="meta-left">
                                        <span class="creator-name">
                                            <img
                                                class="creator-avatar"
                                                :src="video.creatorImg"
                                                :alt="video.creatorName"
                                            />
                                            {{ video.creatorName }}
                                        </span>
                                        <button class="follow-btn">
                                            <img src="/Logo&Icon/Watch Clips/Icon_follow.webp" alt="">
                                            Follow
                                        </button>
                                    </div>
                                </div>

                                <div class="tags-row">
                                    Hashtag :
                                    <span
                                        v-for="(tag, index) in video.clipTags"
                                        :key="index"
                                        class="tag"
                                    >
                                        {{ tag }}
                                    </span>
                                </div>

                                <div class="creator-bottom">
                                    <div class="meta-left">
                                        <div>รหัสหนัง : <span>{{ video.clipNumber }}</span></div>
                                        <div>สตูดิโอ : <span>{{ video.clipPublisher }}</span></div>
                                    </div>
                                    <div class="meta-right">
                                        <div class="meta-item">
                                            <div class="inner-view">
                                                <img src="/Home/Icon_view_white.webp" alt="">
                                                <span class="view-num">{{ video.clipView }}</span>
                                            </div>
                                            <div class="inner-date">
                                                <span class="date-num">{{ video.clipDate }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </VideoPlayer>
            <VideoList title="AV" add-class="av" :clips="videoData">
                <template #card-footer="{ clip }">
                    <div class="card-footer">
                        <div class="clips-title">{{ clip.avTitle }}</div>
                        <div class="video-inner">
                            <div class="video-inner-left">
                                <div class="inner-view"><img src="/Home/Icon_view.webp" alt=""><span class="view-num">{{ clip.avView }}</span></div>
                            </div>
                            <div class="video-inner-right">
                                <span class="diamond-num">{{ clip.avUploadDate }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </VideoList>
            <AppFooter />
        </main>
        <CreatorList />
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import VideoPlayer from '../components/VideoPlayer.vue'
import VideoList from '../components/VideoList.vue'
import AppFooter from '../components/AppFooter.vue'
import CreatorList from '../components/CreatorList.vue'

const videoInner = {
    videoSrc: '/public/file_example_MP4_1280_10MG.mp4',
    creatorImg: '/Home/Icon_creator_member.webp',
    creatorName: 'Creator01',
    creatorFollow: '0',
    clipName: 'ปวดเจ็บ 97 ครั้ง! สั่น 3200 ครั้ง! สะอึก 2100 ซีซี! ร่างกายที่สมบูรณ์แบบสูงผอม การตื่นรู้เรื่องเซ็กส์ เป็นครั้งแรกของการสัปหงกสุดยอด โซระอามิซูระ | Sora Amakawa',
    clipTitle: 'エロく成長してきた長身完美ボディ天川そらの第4弾！今までのイク感覚の更に上を目指して貰いました！媚薬オイル、拘束玩具責め、めった突きピストン！脳内が快楽ホルモンで満たされ覚醒アクメに到達！大量のイキ潮をぶちまける膣絶頂！「イクイクイクまたイッちゃう！！」イキっ放しで全身をビクつかせ美しき裸体をのけ反らせる姿はただただエロい！',
    clipView: '88',
    clipDate: '2025-10-28',
    clipTags: ['Japan', 'NTR', 'MILF', 'Big boob', 'Wife'],
    clipNumber: 'PPPD-998',
    clipPublisher: 'SOD',
    favorite: '0'
}

const videoData = [
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator01', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '1585', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator02', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator08', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '85', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator06', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '185', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator07', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '1515', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator02', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '1005', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator05', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '1455', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator12', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator35', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '85', avUploadDate: '2025-11-19' },
]
</script>