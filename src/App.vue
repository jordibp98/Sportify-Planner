<template>
  <div id="app" class="bg-gray-100 flex flex-col min-h-screen">
    <Header /> <!-- Afegim el Header a la pàgina -->
    <div class="flex-grow">
      <router-view /> <!-- El contingut ocupa tot l'espai disponible -->
    </div>
    <Footer /> <!-- El Footer es mostrarà a la part inferior de la pàgina -->
  </div>
</template>

<script>
import Header from './components/Header.vue';  // Importem el Header
import Footer from './components/Footer.vue';  // Importem el Footer

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Fons més clar i suau */
body {
  background-color: #f7f7f7; /* Gris suau */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garantir que l'element ocupi tota l'alçada de la pantalla */
}

.flex-grow {
  flex-grow: 1; /* El contingut ocupa tot l'espai disponible i fa que el footer quedi al final */
}

footer {
  margin-top: auto; /* El footer es mourà al final de la pàgina només si el contingut és petit */
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