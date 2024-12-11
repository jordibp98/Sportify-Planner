import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes' //importamos el router de routes.js
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app') //añadimos .use(router)
//crea app usa router, usa la pinia y montala en la app