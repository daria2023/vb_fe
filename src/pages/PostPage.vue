<template>

    <single-post :post="targetPost"></single-post>
    <post-comments :cmts="targetPost.comments">
    </post-comments>

</template>

<script>
import SinglePost from '../components/SinglePost.vue';
import PostComments from '../components/PostComments.vue';
import instance from '../axiosInstance';
export default {
    components: {
        SinglePost,
        PostComments
    },
    data() {
        return {
            targetPost: null,
        }
    },
    created() {
        this.findPost(this.$route.params.postId)
    },
    methods: {
        findPost(id) {
            const posts = this.$store.getters['posts/posts']
            const post = posts.find(p => p._id === id);
            this.targetPost = post
        },
    },
    watch: {
        $route(value) {
            this.findPost(value.params.postId)
        }
    }
}
</script>