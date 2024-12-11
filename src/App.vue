<template>
  <div id="app" class="bg-gray-100">
    <Header /> <!-- Afegim el Header a la pàgina -->
    <router-view /> <!-- Aquí es mostren les diferents vistes segons la ruta -->
  </div>
</template>

<script>
import Header from './components/Header.vue';  // Importem el Header

export default {
  name: 'App',
  components: {
    Header, // Afegim el Header al component
  },
};
</script>

<style>
/* Fons més clar i suau */
body {
  background-color: #f7f7f7; /* Gris suau */
}
</style>




<!-- 
<template >
  <div>
    <h1 class="text-8xl flont-black text-emerald-800"> {{ title }}</h1>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name:"App",
  data(){
    return{
      title: "Holaaa!"
    }
  }
}
</script>


<style>
  
</style> -->