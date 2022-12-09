<template>
    <main>
        <write-post v-if="auth"></write-post>
        <post-feed :posts="posts">
        </post-feed>
    </main>
</template>

<script>
import PostFeed from '../components/PostFeed.vue';
import WritePost from '../components/WritePost.vue';

export default {
    components: {
        PostFeed,
        WritePost,      
    },
    computed: {
        auth(){
            return this.$store.getters['user/auth']
        },
        posts() {
            return  this.$store.getters['posts/posts']
        }
    },
    created(){
        this.$store.dispatch('posts/fetchAllPosts')  
    }
}
</script>