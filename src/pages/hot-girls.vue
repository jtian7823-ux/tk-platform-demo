<template>
    <div class="page">
        <HeaderBar />
        <main class="content">
            <VideoList title="Hot Girls" add-class="hot-girl" :clips="videoData" />
            <AppFooter />
        </main>
    </div>
</template>

<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import VideoList from '../components/VideoList.vue'
import AppFooter from '../components/AppFooter.vue'

const videoData = [
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator01', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1585', clipdiamond: '100', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '585', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '85', clipdiamond: '200', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator06', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '185', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator07', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1882', clipView: '1515', clipdiamond: '900', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator02', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '1005', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator05', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '582', clipView: '1455', clipdiamond: '1000', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator12', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator35', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '1332', clipView: '85', clipdiamond: '200', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator10', clipCover: '/Image/Hot_01.webp', clipTitle: 'clip title test test test', clipFavorite: '822', clipView: '58', clipdiamond: '100', favorite: '1' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator08', clipCover: '/Image/Hot_02.webp', clipTitle: 'clip title test test test', clipFavorite: '1122', clipView: '585', clipdiamond: '100', favorite: '0' },
    { viedoLink: '/play', creatorImg: '/Home/Icon_creator_member.webp', creatorName: 'Creator09', clipCover: '/Image/Hot_03.webp', clipTitle: 'clip title test test test', clipFavorite: '882', clipView: '585', clipdiamond: '800', favorite: '0' },
]
</script>