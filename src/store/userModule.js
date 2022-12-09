import instance from "../axiosInstance"

export default {
    namespaced:true,
    state(){
        return {
            loggedin: JSON.parse(localStorage.getItem('log')),
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    mutations:{
        login(state,payload){
            state.loggedin = true,
            state.user = payload.user
            localStorage.setItem('log',JSON.stringify(state.loggedin))
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        logout(state){
            state.loggedin = false
            localStorage.removeItem('log')
            state.user = null
            localStorage.removeItem('user')
        }
    },
    getters:{
        auth(state){
            return state.loggedin
        },
        user(state){
            return state.user
        }
    },
    actions: {
        login(context,payload){
            context.commit('login',payload)
        },
        logout(context){
            context.commit('logout')
        },
    }
}