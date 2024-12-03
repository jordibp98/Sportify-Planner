import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes' //importamos el router de routes.js

createApp(App).use(router).mount('#app') //añadimos .use(router)
