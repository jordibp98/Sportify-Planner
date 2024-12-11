<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Training Plan</h1>

    <!-- Selecció d'objectiu -->
    <label for="goal" class="block mb-2 font-medium">Select your goal:</label>
    <select
      id="goal"
      v-model="store.selectedGoal"
      @change="store.fetchExercises"
      class="border p-2 mb-4 w-full"
    >
      <!-- Afegim totes les opcions disponibles -->
      <option value="arms">Arms</option>
      <option value="legs">Legs</option>
      <option value="core">Core</option>
      <option value="cardio">Cardio</option>
      <option value="abs">Abs</option>
      <option value="back">Back</option>
      <option value="chest">Chest</option>
      <option value="shoulders">Shoulders</option>
    </select>

    <!-- Estat de càrrega -->
    <div v-if="store.loading" class="text-blue-500">Loading exercises...</div>

    <!-- Llista d'exercicis amb imatges -->
    <ul v-else class="list-disc pl-4">
      <li v-for="exercise in store.exercises" :key="exercise.id" class="mb-4">
        <div class="flex items-center gap-4">
          <!-- Imatge de l'exercici -->
          <img
            v-if="exercise.image"
            :src="exercise.image"
            alt="Exercise image"
            class="w-20 h-20 object-cover"
          />
          <!-- Nom de l'exercici -->
          <span>{{ exercise.name }}</span>
        </div>
      </li>
    </ul>

    <!-- Botó per anar amunt -->
    <button 
      @click="scrollToTop"
      class="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700"
    >
      ↑
    </button>
    
  </div>
</template>

<script>
import { useWorkoutStore } from "../stores/Workout";

export default {
  setup() {
    const store = useWorkoutStore();
    // Carrega els exercicis inicials
    store.fetchExercises();
    return { store };
  },
};
</script>

<style scoped>
/* Estils específics*/
</style>
