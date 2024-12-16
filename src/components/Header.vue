<template>
    <header class="p-4 bg-gray-800 text-white flex items-center justify-between">
      <!-- Logo -->
      <img 
        src="../assets/images/logo.png" 
        alt="Sportify Planner Logo" 
        class="w-16 h-auto" 
      />
      <!-- Menú de navegació -->
      <nav class="flex gap-4">
        <!-- Enllaç a la pàgina d'inici -->
        <RouterLink to="/" class="hover:text-gray-200">Home</RouterLink>
        <!-- Enllaç a la pàgina de pla d'entrenament, crida de fetchExercises -->
        <RouterLink 
          to="/training-plan" 
          class="hover:text-gray-200"
          @click.native="fetchExercises"
        >Training Plan</RouterLink>
        <!-- Enllaç a la pàgina de competicions -->
        <RouterLink to="/Competitions" class="hover:text-gray-200">Competitions</RouterLink>
        <RouterLink to="/blog" class="hover:text-gray-200">Blog </RouterLink>

      </nav>
    </header>
  </template>
  
  <script>
  import { useWorkoutStore } from "../stores/Workout";  // Importem la store
  
  export default {
    name: "Header",
    methods: {
      // Cridem la funció per carregar els exercicis quan es fa clic a "Training Plan"
      fetchExercises() {
        const store = useWorkoutStore();  // Obtenim l'store
        store.fetchExercises();  // Carreguem els exercicis
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estils per la capçalera */
  header {
    background-color: #2d3748; /* Fons gris fosc per a la capçalera */
  }
  
  /* Estils dels enllaços del menú */
  nav a {
    text-decoration: none; /* Eliminar el subratllat dels enllaços */
    color: #e2e8f0; /* Color de text gris clar per als enllaços */
  }
  
  nav a:hover {
    color: #ffffff; /* Canviar el color del text a blanc quan es passa per sobre */
  }
  </style>
  
  