<template>
    <div class="flex h-screen">
      <!-- Secció esquerra  imatge de fons i text -->
      <div class="p-4 bg-[url('./assets/images/imatge1.png')] bg-cover bg-center w-4/5 min-h-screen">
        <div class="flex items-start justify-start flex-col">
          <h1 class="text-2xl font-bold mb-4 text-grey">Welcome to the Sportify Planner App!</h1>
          <p class="mb-4 text-gray">Plan your workouts and competitions with ease.</p>
  
          <div class="flex flex-wrap gap-4 text-left">
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
        </div>
      </div>
  
      <!-- Secció dreta blog -->
      <div class="w-1/5 bg-gray-100 p-6">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Latest News & Tips</h2>
        <div class="grid grid-cols-1 gap-6">
          <!-- Entrada 1 -->
          <div class="bg-white rounded-lg shadow p-4">
            <RouterLink to="/blog/1" class="text-lg font-bold text-blue-500 hover:underline">
              How to Prepare for Your First Marathon
            </RouterLink>
            <p class="text-gray-600 text-sm mt-2">
              Discover essential tips for training, nutrition, and mental preparation.
            </p>
          </div>
  
          <!-- Entrada 2 -->
          <div class="bg-white rounded-lg shadow p-4">
            <RouterLink to="/blog/2" class="text-lg font-bold text-blue-500 hover:underline">
              Top 5 Trail Running Locations in Europe
            </RouterLink>
            <p class="text-gray-600 text-sm mt-2">
              Explore breathtaking trails perfect for all experience levels.
            </p>
          </div>
  
          <!-- Entrada 3 -->
          <div class="bg-white rounded-lg shadow p-4">
            <RouterLink to="/blog/3" class="text-lg font-bold text-blue-500 hover:underline">
              The Importance of Rest Days
            </RouterLink>
            <p class="text-gray-600 text-sm mt-2">
              Learn why recovery is key to improving your performance.
            </p>
          </div>
        </div>
      </div>
      <button 
      @click="scrollToTop"
      class="fixed bottom-16 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700">
      ↑
    </button>
    </div>
  </template>
  
  <script>
  import { RouterLink } from "vue-router";
  
  export default {
    name: 'Home',
    components: {
      RouterLink
    },
    methods: {
    // Funció per fer scroll cap amunt 
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
  };
  </script>
  
  <style>
  body {
  margin: 0;
  padding: 0;
}

.flex {
  margin-bottom: 0;
}

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