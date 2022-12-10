<template>
    <main>
        <the-loader v-if="loading"></the-loader>
        <form @submit.prevent="handleLogin" v-else>
            <input type="text" v-model="userName" placeholder="enter userName..."/>
            <input type="password" v-model="password" placeholder="password here..." />
            <base-button type='submit' mode="button">login</base-button>
            <p>New user here? <router-link to='/reg'>Sign up</router-link></p>
            <p v-if="emptyCheck">Please check you filled all blanks...</p>
            <p v-if="loadErr" class="err">⚠️There is something wrong, pls check again...</p>
        </form>

    </main>
</template>

<script>
import instance from '../axiosInstance'
import TheLoader from '../UI/TheLoader.vue'

export default {
    components:{
        TheLoader,
    },
    data(){
        return {
            userName:'',
            password:'',
            emptyCheck:false,
            loading:false,
            loadErr:false,
        }
    },
    methods:{
        async handleLogin (){
            if(this.userName && this.password) {
                this.loadErr = false
                this.emptyCheck = false
                this.loading = true
                try {
                    const res = await instance.post('/auth/login',{
                        userName:this.userName,
                        password:this.password,
                    })
                    this.$store.dispatch('user/login',{
                        user:res.data
                    })
                this.$router.push('/')
                this.loading = false
                } catch (error) {
                    console.log(error)
                    this.loading = false;
                    this.loadErr = true;
                }
                
            } else {
                this.emptyCheck = true
            }
            
        }
    }
}
</script>

<style scoped>
main {
    width:100%;
    min-height:calc(100vh - 2rem);
    background-image: linear-gradient(to right top, #820bbb, #8413c2, #8519c9, #871fd1, #8824d8, #9221d2, #9a1dcd, #a21bc7, #ad12b4, #b310a3, #b61692, #b62084);
    display: flex;
    justify-content: center;
    align-items: center;
}
form {
    width:80%;
    max-width: 400px;
    height:400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: rgba(255, 255, 255, 0.123);
    border-radius: 5px;
}
input {
    width: 50%;
    outline: none;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    padding: 5px;
    border-radius: 3px;
}
input.err {
    border: 1px solid red;
}
p {
    font-size: 0.8rem;
    color: var(--color-gray);
}
a {
    color: #eee;
}


</style>