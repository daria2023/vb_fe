<template>
    <write-comment></write-comment>
    <single-comment v-for="cmt in cmts" :key="cmt.id" :comment="cmt"></single-comment>
</template>

<script>
import SingleComment from './SingleComment.vue';
import WriteComment from './WriteComment.vue';
export default {
    props:['cmts'],
    components: {
        WriteComment,
        SingleComment
    },
    data() {
        return {
            comment: ''
        }
    }
}
</script>