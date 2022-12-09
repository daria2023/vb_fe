import { createStore } from "vuex";
import postsModule from "./postsModule";
import userModule from "./userModule";

const store = createStore({
    modules: {
        posts:postsModule,
        user:userModule,
    },
    state() {
        return {
            
        }
    }
})

export default store;