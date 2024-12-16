<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Training Plan</h1>

    <!-- Selecció de la part del cos -->
    <label for="goal" class="block mb-2 font-medium">Select body part:</label>
    <select
      id="goal"
      v-model="store.selectedGoal"
      @change="store.fetchExercises"
      class="border p-2 mb-4 w-full"
    >
      <!-- Parts del cos disponibles -->
      <option value="back">Back</option>
      <option value="cardio">Cardio</option>
      <option value="chest">Chest</option>
      <option value="lower arms">Lower Arms</option>
      <option value="lower legs">Lower Legs</option>
      <option value="shoulders">Shoulders</option>
      <option value="upper arms">Upper Arms</option>
      <option value="upper legs">Upper Legs</option>
      <option value="waist">Waist</option>
    </select>

    <!-- Estat de càrrega -->
    <div v-if="store.loading" class="text-blue-500">Loading exercises...</div>

    <!-- Llista d'exercicis -->
    <ul v-else class="list-disc pl-4">
      <li v-for="exercise in store.exercises" :key="exercise.id" class="mb-4">
        <div class="flex items-center gap-4">
          <!-- GIF de l'exercici -->
          <img
            v-if="exercise.gifUrl"
            :src="exercise.gifUrl"
            alt="Exercise GIF"
            class="w-20 h-20 object-cover"
          />
          <!-- Nom de l'exercici -->
          <span>{{ exercise.name }}</span>
        </div>
      </li>
    </ul>
    <button 
      @click="scrollToTop"
      class="fixed bottom-16 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700">
      ↑
    </button>
  </div>
</template>

<script>
import { useWorkoutStore } from "../stores/Workout";

export default {
  setup() {
    const store = useWorkoutStore();
    // Carrega exercicis inicials
    store.fetchExercises();
    return { store };
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

<style scoped>
/* Estils per personalitzar */
</style>

