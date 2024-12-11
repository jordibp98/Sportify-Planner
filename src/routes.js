import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"; // Importem les vistes
import TrainingPlan from "./views/TrainingPlan.vue";
// import Competitions from "./views/Competitions.vue";
import ManageCompetition from "./views/ManageCompetition.vue";


const routes = [
  {
    path: "/", // Ruta principal
    name: "Home",
    component: Home,
  },
  {
    path: "/training-plan", // Ruta per als entrenaments
    name: "TrainingPlan",
    component: TrainingPlan,
  },
  {
    path: "/competitions", // Ruta per a les competicions
    name: "ManageCompetitions",
    component: ManageCompetition,
  },
];

// Creem el router i l'exportem
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



// //info en https://router.vuejs.org/guide/

// import { createWebHashHistory, createRouter } from 'vue-router'

// import Home from './views/Home.vue'


// const routes = [ //contiene objectos por cada ruta que hay, 3 propiedades, un path, un name y un component
//   { path: '/', 
//     name:"Home",
//     component: Home},  //hace referencia al componente importado arriba
    
//     //aqui pondremos las siguientes rutas
// ];

// const router = createRouter({ //la funcion create router recibe como argumento un objeto{}, dentro del objeto dos propiedades: history y routes
//   history: createWebHashHistory(),
//   routes: routes //como se llaman igual se podria omitir una de las dos y poner solo routes
// })

// export default router