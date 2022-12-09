<template>
    <user-header :user="user"></user-header>
    <router-view>
        
    </router-view>
    <post-feed :posts="posts"></post-feed>
</template>

<script>
import UserHeader from '../components/UserHeader.vue'
import PostFeed from '../components/PostFeed.vue'
import instance from '../axiosInstance';

export default {
    data(){
        return {
            user:null,
            posts:null,
        }
    },

    components:{
        PostFeed,
        UserHeader,
    },
    computed:{
        userId(){
            return this.$route.params.userId
        }
    },
    methods:{
        async getUser(){
            const res  = await instance.get('/auth/' + this.userId);
            this.user = res.data
        },
        async fetchPosts(){
            const res = await instance.get('/posts/user/' + this.userId);
            this.posts = res.data
        }
    },
    created(){
        this.getUser();
        this.fetchPosts();
    },
    watch:{
        $router(value){
            this.fetchUser(value.params.userId)
        }
    }
}
</script>

<style scoped>

</style>