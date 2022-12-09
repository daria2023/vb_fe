<template>  
    <base-box class="single-cmt" :class="{'mini':minisize}">
    <div class="user">
        <img :src="user?.avatar" alt="userAvatar" />    
    </div>
    <div class="cmt">
        <span class="userName">{{user?.userName}}</span>
        <span class="postTime">{{ postDate }}</span>
        <p>{{comment.content}}</p>
    </div>
    <div class="del">       
        <i v-if="!minisize" class="fa-solid fa-compress" @click="setMini"></i>
        <i v-if="minisize" class="fa-solid fa-expand" @click="setExpand"></i>
    </div>
    </base-box>
</template>

<script>
import instance from '../axiosInstance';
export default {
    props:['comment'],
    data(){
        return {
            user:null,   
            minisize:false     
        }
    },
    computed: {
        postDate() {
            const time = new Date(this.comment.createdAt);
            return time.toLocaleDateString()
        },
    },
    beforeMount(){
        this.getUser()
    },
    methods:{
        async getUser(){
            const res  = await instance.get('/auth/' + this.comment.userId);
            this.user = res.data
        },
        setMini(){
            this.minisize = true
        },
        setExpand(){
            this.minisize = false
        }
    }
}
</script>

<style scoped>
.single-cmt {
    display: grid;
    grid-template-columns: 50px 1fr 10px;
    gap: 1rem;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
}

.mini {
    height: 4.5rem;
    overflow: hidden;
}
.user {
    flex: 1;
}
.user img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}
.userName {
    font-size: 0.8rem;
    color: #333;
    align-items: center;
    text-transform: capitalize;
    margin-bottom: 10px;
    margin-right: 10px;
}
.postTime {
    font-size: 0.6rem;
    color: #666;
}
.cmt {
    border-left: 1px dotted var(--color-gray);
    padding:0 1rem;
    word-wrap:break-word;
}

i {
    cursor: pointer;
    color:var(--color-gray);
}
</style>