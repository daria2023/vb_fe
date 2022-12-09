import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router.js'

import BaseBox from './UI/BaseBox.vue'
import BaseButton from './UI/BaseButton.vue'

const app = createApp(App)

app.component('base-box', BaseBox)
app.component('base-button', BaseButton)


app.use(store)
app.use(router)
app.mount('#app')
