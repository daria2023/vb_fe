<template>

    <base-box class="single-post">
        <header>
            <div class="user-related">
                <div class="avatar">
                    <router-link :to="userLink" class="userLink">
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
            <pre> <p>{{ post.content }}</p></pre>
        </div>
        <footer>
            <div class="like">
                <i class="fa-regular fa-heart " @click="toggleLike" :class="{'liked': likeIcon }"></i>
                <span class="like-num">{{ likeNum === 0 ? '' : likeNum }}</span>
            </div>
            <router-link :to="singleLink" class="cmt">
                <i class="fa-regular fa-comment"></i>
                <span class="cmt-num">{{ post.comments.length === 0 ? '' : post.comments.length }}</span>
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
            likeIcon: null,
            likeNum: null,
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
        },
        userLike(){
            return this.post?.likes?.includes(this.authedUser?._id) ? true : false
        }
        
    },
    created() {
        this.getUser();
        this.likeIcon = this.post?.likes?.includes(this.authedUser?._id) ? true : false;
        this.likeNum = this.post?.likes.length;
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
            const res = await instance.get('/auth/' + this.post?.userId);
            this.user = res.data;
        },
        async toggleLike() {
            const res = await instance.put('/posts/likes/' + this.post._id, {
                userId: this.authedUser._id
            });
            const likeResult = await res.data
            this.likeIcon = !this.likeIcon
            if(likeResult === 'post has been disliked'){
                this.likeNum--;
            } 
            if(likeResult === 'post has been liked') {
                this.likeNum++;
            }
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


.cmt,
.like {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
}

.cmt-num,
.like-num {
    font-size: 0.8rem;
    color: #666;
    font-family: sans-serif;
}

i {
    cursor: pointer;
}

.like:hover {
    color: var(--color-red);
}

i.liked {
    color: var(--color-red);
}


.cmt:hover {
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

.single-post-content {
    white-space: pre-wrap;       /* css-3 */
 white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
 white-space: -pre-wrap;      /* Opera 4-6 */
 white-space: -o-pre-wrap;    /* Opera 7 */
 word-wrap: break-word;    
}
</style>