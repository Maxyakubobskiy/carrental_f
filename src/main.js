import { createApp } from 'vue'
import Carrental from './views/HomePage.vue'
import router from './router'

createApp(Carrental)
    .use(router)
    .mount('#app');
