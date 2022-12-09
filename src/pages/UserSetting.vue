<template>
    <base-box class="setting" v-if="auth">
        <form @submit.prevent="handleSubmit">
            <div class="form-control">
                <label>UserName: </label>
                <input type="text" v-model="userName" :placeholder="authedUser.userName"/>
            </div>
            <div class="form-control">
                <label>password: </label>
                <input type="text" v-model="userPassword"/>
            </div>
            <div class="form-control">
                <label>avatarLink </label>
                <input type="text" v-model="avatarLink" placeholder="input a valid img link..."/>
            </div>
            
            <base-button type="submit" mode="button">save</base-button>
        </form>
            <img :src="avatarUpload" alt=""/>
    </base-box>
</template>

<script>
import instance from '../axiosInstance'
export default {
    data(){
        return {
            userName:'',
            userPassword:'',
            avatarLink:'',
            avatarUpload:'',
            noUpload:false,
            authedUser: this.$store.getters['user/user'],
            auth:this.$store.getters['user/auth']
        }
    },
    computed:{
        authUserPage(){
            return this.authedUser._id === this.$route.params.userId ? true : false    
        },
        changedUserName(){
            if(this.userName.trim()){
                return this.userName
            } else {
                return this.authedUser.userName
            }
        },
        changedPw(){
            if(this.userPassword.trim()){
                return this.userPassword
            } else {
                return this.authedUser.password
            }
        },
        changedAvatar(){
            if(this.avatarLink.trim()){
                return this.avatarLink
            } else {
                return this.authedUser.avatar
            }
        }
    },
    watch:{
        avatarLink(value){
            if(value){
                this.avatarUpload = value;
            } else {
                this.noUpload =true;
            }
        }
    },
    methods:{
        
        async handleSubmit(){
            if(!this.changedPw) {
                try {
                    const res = await instance.put('/auth/' + this.authedUser._id, {
                    userName:this.changedUserName,
                    avatar:this.changedAvatar,
                })
                    this.$store.dispatch('user/login',{
                        user:res.data
                    })
                    this.$router.push('/')
                } catch (error) {
                    console.log(error)
                }  
            } else {
                try {
                    await instance.put('/auth/' + this.authedUser._id, {
                    userName:this.changedUserName,
                    password:this.changedPw,
                    avatar:this.changedAvatar,
                })
                this.$store.dispatch("user/logout");
                this.$router.push('/')
                } catch (error) {
                    console.log(error)
                } 
            }
        }
    }
}
</script>

<style scoped>
.form-control {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 150px;
    margin-bottom: 1rem;
}
.form-control label {
    text-transform: capitalize;
    
}
.form-control input {
    outline: none;
    width:150px;
    border: none;
    border-bottom: 1px solid var(--color-gray);    
}
.setting {
    position: relative;
    border: none;
}
.setting img{
    position: absolute;
    top: -100px;
    width: 100px;
    height:100px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
}
</style>