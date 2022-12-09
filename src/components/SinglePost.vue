<template>

    <base-box class="single-post">
        <header>
            <div class="user-related">
                <div class="avatar">
                    <router-link :to="userLink">
                        <img :src="user?.avatar" alt="avt" />
                    </router-link>
                </div>
                <div class="post-info">
                    <span class="user-name">{{ user?.userName }}</span>
                    <span class="post-time">{{ postDate }}</span>
                </div>
            </div>
            <div class="post-link">
                <i class="fa-solid fa-ellipsis-vertical" @click="toggleDelete"></i>
                <i v-if="delete" class="fa-regular fa-trash-can" @click="deletePost"></i>
            </div>
        </header>
        <div class="single-post-content">
            <p>{{ post.content }}</p>
        </div>
        <footer>
            <i class="fa-regular fa-heart "></i>
            <router-link :to="singleLink" class="cmt">
                <i class="fa-regular fa-comment "></i>
                <span class="cmt-num">{{post.comments.length === 0 ? '': post.comments.length}}</span>
            </router-link>
            <div class="copy-icon">
                <i class="fa-regular fa-clipboard" @click="copyContent"></i>
                <p v-if="copied" class="copy">copied</p>
            </div>
        </footer>
    </base-box>
</template>

<script>
import instance from '../axiosInstance';

export default {
    props: ['post'],
    data() {
        return {
            delete: false,
            copied: false,
            user: null,
        }
    },
    computed: {
        singleLink() {
            return '/posts/' + this.post?._id;
        },
        postDate() {
            const time = new Date(this.post.createdAt);
            return time.toLocaleDateString()
        },
        authedUser() {
            return this.$store.getters['user/user']
        },
        userLink() {
            return '/users/' + this.user?._id;
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        toggleDelete() {
            if (this.user._id === this.authedUser._id) {
                this.delete = !this.delete;
            }
        },
        deletePost() {
            const delConfirm = window.confirm('you sure to delete this post?')
            if (delConfirm) {
                this.$store.dispatch('posts/delPost', { id: this.post._id })
            }
        },
        copyContent() {
            const timeOut = setTimeout(() => {
                this.copied = false;
            }, 1500)
            this.copied = true
            navigator.clipboard.writeText(this.post.content)
        },
        async getUser() {
            const res = await instance.get('/auth/' + this.post.userId);
            this.user = res.data
        }
    }
}
</script>

<style scoped>
.single-post {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user-related {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
}

.avatar img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
}

.post-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
span.user-name {
    text-transform: capitalize;
}

span.post-time {
    font-size: 0.75rem;
    color: #333;
}

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
}
a {
    text-decoration: none;
    color: #333;
}

a:hover {
    color: var(--color-yellow);
}
.cmt {
    display: flex;
    gap: 3px;
    align-items: center;
}

.cmt-num {
    font-size: 0.75rem;
}

i {
    cursor: pointer;
}

.fa-heart:hover {
    color: var(--color-red);
}

.fa-comment:hover,
.cmt-num:hover {
    color: var(--color-green);
}

.fa-clipboard:hover {
    color: var(--color-blue);
}



.post-link {
    position: relative;
}

.fa-trash-can {
    position: absolute;
    left: -1.25rem;
    top: 1.25rem;
}

.copy-icon {
    position: relative;
}

p.copy {
    position: absolute;
    top: -1rem;
    left: -1rem;
    font-size: 0.8rem;
    color: var(--color-blue);
}


</style>