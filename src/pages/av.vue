<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
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
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import VideoList from '../components/VideoList.vue'
import AppFooter from '../components/AppFooter.vue'

const videoData = [
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator01', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '1585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator02', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator08', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '85', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator06', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '185', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator07', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '1515', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator02', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '1005', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator05', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '1455', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator12', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator35', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '85', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator10', clipCover: '/Image/AV_01.webp', avTitle: 'av title test test test', avView: '58', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator08', clipCover: '/Image/AV_02.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
    { viedoLink: '/av-play', creatorImg: '/Home/Icon_AV.webp', creatorName: 'Creator09', clipCover: '/Image/AV_03.webp', avTitle: 'av title test test test', avView: '585', avUploadDate: '2025-11-19' },
]
</script>