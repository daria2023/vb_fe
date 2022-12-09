import instance from "../axiosInstance"

export default {
    namespaced: true,
    state() {
        return {
            posts: []
        }
    },
    mutations: {
        addPost(state, payload) {
            state.posts.unshift(payload.post)
        },
        deletePost(state, payload) {
            state.posts = state.posts.filter(p => p.id !== payload.id)
        },
        fetchPosts(state, payload) {
            console.log('change')
            state.posts = payload;
        }
    },
    getters: {
        posts(state) {
            return state.posts
        }
    },
    actions: {
        async addPost(context, payload) {
            try {
                await instance.post('/posts',payload.post)
                context.dispatch('fetchAllPosts')
            } catch (error) {
                console.log(error)
            }
        },
        async delPost(context, payload) {
            console.log('del', payload)
            try {
                await instance.delete(`/posts/${payload.id}`)
                context.dispatch('fetchAllPosts')
            } catch (error) {
                
            }
            context.commit('deletePost', payload)
        },
        async fetchAllPosts(context) {
            try {
                const { data } = await instance.get('/posts');
                context.commit('fetchPosts', data)
            } catch (error) {
                console.log(error)
            }
        }

    },

}