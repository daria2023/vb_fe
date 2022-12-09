<template>
    <nav>
        <router-link to="/">🧙‍♀️</router-link>
        <a href="https://blog-static-d83g.onrender.com/" alt="blog">blog</a>
        <div class="log" v-if="auth">
            
            <router-link :to="`/users/${user._id}/setting`">
                <img :src="user.avatar" alt="userAvatar" />
            </router-link>
            <i class="fa-solid fa-door-open" @click="logout"></i>
        </div>
        <div v-else>
            <router-link to="/login">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </router-link>
        </div>
    </nav>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router';

export default {
    computed: {
        auth() {
            return this.$store.getters["user/auth"];
        },
        user() {
            return this.$store.getters["user/user"];
        },

    },
    methods: {
        logout() {
            this.$store.dispatch("user/logout");
            this.$router.push('/login')
        }
    },
    components: { router }
}
</script>

<style scoped>
nav {
    height: 2rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px dotted #67406446;
}

a {
    text-decoration: none;
    letter-spacing: 1px;
}

a,
i {
    color: #674064;
    cursor: pointer;
}

a:hover,
i:hover {
    color: #c673bf;
}

.log {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
}
</style>