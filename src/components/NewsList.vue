<template>
    <section class="event-news">
        <div class="title-box">
            <h1>Event News</h1> 
        </div>

        <div class="event-news-list">
            <article
                class="event-news-item"
                v-for="news in eventNews"
                :key="news.newsTitle"
            >
                <div class="event-news-img">
                    <img :src="news.newsImg" :alt="news.newsTitle" />
                </div>
                <div class="event-news-content">
                    <span class="event-news-kind">{{ news.newsKind }}</span>
                    <div class="event-news-title"><h2>{{ news.newsTitle }}</h2><router-link to="/eventNews/news-page">See more</router-link></div>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
import '../assets/css/style.css'

const eventNews = [
    { newsImg: '/Image/event_news_01.webp', newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789', newsKind: 'Member'},
    { newsImg: '/Image/event_news_02.webp', newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789', newsKind: 'Announcement'},
    { newsImg: '/Image/event_news_03.webp', newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789', newsKind: 'Member'},
    { newsImg: '/Image/event_news_01.webp', newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789', newsKind: 'Announcement'},
    { newsImg: '/Image/event_news_02.webp', newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789', newsKind: 'Announcement'},
    { newsImg: '/Image/event_news_03.webp', newsTitle: 'Event title 01 test 123 456 789 Event title 01 test 123 456 789', newsKind: 'Member'},
]
</script>