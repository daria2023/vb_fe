<template>
    <section class="posts">
        <single-post v-for="post in posts" :key="post?._id" :post="post"></single-post>
    </section>

</template>

<script>
import SinglePost from './SinglePost.vue';

export default {
    props:['posts'],
    components: {
        SinglePost,
    }
}
</script>
