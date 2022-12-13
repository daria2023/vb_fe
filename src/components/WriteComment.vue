<template>
    <base-box>
        <form @submit.prevent="submitCmt">
            <textarea v-model="userCommnet"></textarea>
            <base-button type="submit" mode="button-linear">comment</base-button>
        </form>
    </base-box>
</template>

<script>
import instance from '../axiosInstance'
export default {
    data() {
        return {
            userCommnet: ''
        }
    },
    computed:{
        postId (){
            return this.$route.params.postId
        }, 
        userId(){
            return this.$store.getters['user/user']._id
        }
    },
    methods: {
        async submitCmt() {
            await instance.post('/cmts/write/' + this.postId,{
                content: this.userCommnet,
                postId: this.postId,
                userId: this.userId,
            })
            this.$router.push('/')
        },
    }
}
</script>

<style scoped>
textarea {
    outline: none;
    width: 100%;
    height: 100px;
    border: 1px solid var(--color-gray);
    border-radius: 3px;
    resize: none;
}
</style>