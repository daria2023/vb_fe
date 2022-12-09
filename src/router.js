import { createRouter, createWebHistory } from "vue-router";
import TheHome from './pages/TheHome.vue'
import PostPage from './pages/PostPage.vue'
import LogPage from './pages/LogPage.vue'
import RegPage from './pages/RegPage.vue'
import UserPage from './pages/UserPage.vue'
import UserSetting from './pages/UserSetting.vue'

import store from "./store";

const routes = [
    {
        path: '/', component: TheHome, beforeEnter: (to, from, next) => {
            if (store.getters['user/auth']) {
                next()
            } else {
                next({ name: 'log' })
            }
        }
    },
    {
        name: 'single', path: '/posts/:postId', component: PostPage
    },
    {
        name: 'log', path: '/login', component: LogPage
    },
    {
        path: '/reg', component: RegPage
    },
    {

    },
    {
        path: '/users/:userId', component: UserPage, children: [
            { path: 'setting', component: UserSetting }]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router