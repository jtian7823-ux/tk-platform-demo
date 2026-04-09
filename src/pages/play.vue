<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <VideoPlayer :video="videoInner" />
            <VideoList title="Related Clips" add-class="related-clips" :clips="videoData" />
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
    creatorFollow: '0' ,
    clipTitle: '這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等。這裡是影片描述文字，介紹影片內容、重點等等...。',
    clipFavorite: '115',
    clipView: '88',
    clipDate: '2025-10-28',
    clipDiamond: '100',
    clipTags: ['Tag1', 'Tag2', 'Cute1', 'Cute2'],
    favorite: '0' 
}

const videoData = [
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100', favorite: '0' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '200', favorite: '0' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900', favorite: '0' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '1005', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '582', clipView: '1455', clipdiamond: '1000', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator12', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '1' },
    { creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator35', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1332', clipView: '85', clipdiamond: '200', favorite: '0' },
]
</script>