<template>
    <section class="profile-header">
        <div class="profile-banner">
            <img class="banner-img" :src="member.bannerImg" alt="Banner" />
            <button class="banner-camera-btn">
                <img :src="theme === 'b' ? '/Edit Profile/Icon_change_image_dark.webp' : '/Edit Profile/Icon_change_image.webp'" alt="Change banner" />
            </button>
        </div>

        <div class="profile-main">
            <div class="profile-left">
                <div class="avatar-wrapper">
                    <div class="avatar-circle">
                        <img class="avatar-img" :src="member.avatarImg" :alt="member.memberName" />
                    </div>
                    <button class="avatar-camera-btn">
                        <img :src="theme === 'b' ? '/Edit Profile/Icon_change_image_dark.webp' : '/Edit Profile/Icon_change_image.webp'" alt="Change avatar" />
                    </button>
                </div>

                <div class="member-info">
                    <div class="member-name-row">
                        <span class="member-name">@{{ member.memberName }}</span>
                        <button class="edit-name-btn">
                            <img :src="theme === 'b' ? '/Edit Profile/Icon_edit_dark.webp' : '/Edit Profile/Icon_edit.webp'" alt="Edit name" />
                        </button>
                    </div>
                    <div class="member-email">{{ member.memberMail }}</div>
                </div>
            </div>

            <!-- 右側 action-btn 照舊 -->
            <div class="profile-actions">
                <button class="action-btn"><img :src="theme === 'b' ? '/Edit Profile/Icon_activity_point_dark.webp' : '/Edit Profile/Icon_activity_point.webp'" alt="">Activity<br>Point</button> 
                <button class="action-btn"><img :src="theme === 'b' ? '/Edit Profile/Icon_change_password_dark.webp' : '/Edit Profile/Icon_change_password.webp'" alt="">Change<br>Password</button> 
                <button class="action-btn"><img :src="theme === 'b' ? '/Edit Profile/Icon_buy_diamond_dark.webp' : '/Edit Profile/Icon_buy_diamond.webp'" alt="">Buy<br>Diamond</button> 
                <button class="action-btn"><img :src="theme === 'b' ? '/Edit Profile/Icon_my_friends_dark.webp' : '/Edit Profile/Icon_my_friends.webp'" alt="">My<br>Friends</button>
            </div>
        </div>
    </section>
</template>


<script setup>
import { inject } from 'vue'

const theme = inject('theme')

const { member } = defineProps({
    member: {
        type: Object,
        required: true,
    },
})

</script>
