//info en https://router.vuejs.org/guide/

import { createWebHashHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'


const routes = [ //contiene objectos por cada ruta que hay, 3 propiedades, un path, un name y un component
  { path: '/', 
    name:"Home",
    component: Home},  //hace referencia al componente importado arriba
    
    //aqui pondremos las siguientes rutas
];

const router = createRouter({ //la funcion create router recibe como argumento un objeto{}, dentro del objeto dos propiedades: history y routes
  history: createWebHashHistory(),
  routes: routes //como se llaman igual se podria omitir una de las dos y poner solo routes
})

export default router