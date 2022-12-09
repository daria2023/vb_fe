<template>
    <main>
        <form @submit.prevent="handleReg">
            <input type="text" v-model="userName" placeholder="enter userName..." />
            <input type="password" v-model="password" placeholder="password here..." />
            <input type="password" v-model="passwordRecheck" placeholder="enter password again..." />
            <base-button type='submit' mode="button">Sign Up</base-button>
            <p v-if="blankCheck" class="alert">pls fill out the blank</p>
            <p v-if="passwordUnheck" class="alert">Pls check the password again</p>
            <p>Already a user? <router-link to='/reg'>Log in</router-link></p>

        </form>

    </main>
</template>

<script>
import instance from '../axiosInstance'
export default {
    data() {
        return {
            userName: '',
            password: '',
            passwordRecheck: '',
            blankCheck: false,
            passwordUnheck: false
        }
    },
    methods: {
        async handleReg() {
            if ( this.userName && this.password && this.passwordRecheck) {
                this.blankCheck = false
                if (this.password !== this.passwordRecheck) {
                    this.passwordUnheck = true
                } else {
                    this.passwordUnheck = false
                    await instance.post('/auth/reg',{
                        userName:this.userName,
                        password:this.password
                    })
                    this.$router.push({name:"log"})
                }
            } else {
                this.blankCheck = true
            }
            
        },
        checkBlank() {
            this.blankCheck = true
        },
    }
}
</script>

<style scoped>
main {
    width: 100%;
    min-height: calc(100vh - 2rem);
    background-image: linear-gradient(to right top, #820bbb, #8413c2, #8519c9, #871fd1, #8824d8, #9221d2, #9a1dcd, #a21bc7, #ad12b4, #b310a3, #b61692, #b62084);
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    width: 80%;
    max-width: 400px;
    height: 400px;
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

p.alert {
    color: #b62084;
}

a {
    color: #eee;
}
</style>