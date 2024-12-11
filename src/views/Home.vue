<template>
    <div class="container mx-auto p-4">
     
  
      <h1 class="text-2xl font-bold mb-4">Welcome to the Sportify Planner App!</h1>
      <p class="mb-4">Plan your workouts and competitions with ease.</p>
  
      <div class="flex flex-wrap gap-4">
        <RouterLink
          to="/training-plan"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Manage Workouts
        </RouterLink>
        <RouterLink
          to="/competitions"
          class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Manage Competitions
        </RouterLink>
      </div>
  
      <Footer /> <!-- Component del peu de pàgina -->
    </div>
  </template>
  
  <script>
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";
  
  export default {
    components: {
      Header,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Estils específics per a aquesta vista */
  </style>
  
  
<!-- 
<template >
    <div>
        <h2>Home view</h2>
        <h3>{{ counter.name }}</h3>
    </div>
</template>
<script>

import useCounterStore from '../stores/esports.js';

export default {
    name: "Home",
    data(){
        return{}
    },
    computed:{
        counter(){
            return useCounterStore()
        }
    },
    methods: {

    }
}
    
</script>
<style>
    
</style> -->