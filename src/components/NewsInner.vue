<template>
    <section class="news-inner">
        <div class="title-box">
            <h1>Event News</h1> 
        </div>

        <article
            class="news-inner-card"
            v-for="news in eventNews"
            :key="news.newsTitle"
        >
            <div class="news-inner-img">
                <img :src="news.newsImg" :alt="news.newsTitle" />
            </div>

            <div class="news-inner-content">
                <!-- <span class="news-inner-kind">{{ news.newsKind }}</span> -->

                <div class="news-inner-title">
                    <h2>{{ news.newsTitle }}</h2>
                </div>

                <!-- 這裡用第二層 v-for 把 news.newsInner 每一段印出來 -->
                <div class="news-inner-text">
                    <p
                    v-for="(paragraph, idx) in news.newsInner"
                    :key="idx"
                    >
                    {{ paragraph }}
                    </p>
                </div>
            </div>
            <router-link to="/eventNews" class="back-link">Back to Event News</router-link>
        </article>
    </section>
</template>

<script setup>
import '../assets/css/style.css'

const eventNews = [
    {
        newsImg: '/Image/event_news_01.webp',
        newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789 Event title 01 test 123 456 789 Event title 01 test 123 456 789 ',
        newsInner: [
            'AIKIP เปิดตัวฟีเจอร์ SHORT video สำหรับสาวกสายสไลด์คลิป !!',
            'ฟีเจอร์นี้ทำขึ้นมาเพื่อให้เพื่อนๆได้เลื่อนดูคลิปได้อย่างมันส์มือกว่าที่เคย ด้วยคลิปวิดีโอที่มีความยาวไม่เกิน 30 วินาที เน้นเนื้อหาแบบรวดเร็วถึงใจ เอาให้ได้ฟินกันไปเลย ',
            'ส่วนใครที่เป็นครีเอเตอร์ก็สามารถลงผลงานให้แฟนคลับ ได้รับชมกันได้เลยค่า อย่าลืมไปลองฟีเจอร์ใหม่กันน้าาา',
            'หากมีข้อสงสัยเพิ่มเติม สามารถสอบถาม แอดมินได้ที่ @141zmeka',
        ],
        newsKind: 'Member',
    },
]

</script>