<template>
    <div>
      <h2>Training Plan</h2>
      <!-- Selector per triar l'objectiu (categoria) -->
      <label for="goal">Select your goal:</label>
      <select id="goal" v-model="selectedGoal" @change="fetchExercises">
        <option value="arms">Arms</option>
        <option value="legs">Legs</option>
        <option value="core">Core</option>
        <option value="cardio">Cardio</option>
        <option value="abs">Abs</option>
        <option value="back">Back</option>
        <option value="chest">Chest</option>
        <option value="shoulders">Shoulders</option>
      </select>
  
      <!-- Indicador de càrrega -->
      <div v-if="loading">Loading exercises...</div>
  
      <!-- Llista d'exercicis amb les seves imatges -->
      <ul v-else>
        <li v-for="exercise in exercises" :key="exercise.id">
          <div>
            <img :src="exercise.image" alt="Exercise image" v-if="exercise.image" />
            <p>{{ exercise.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  
  <script>
  import { useWorkoutStore } from '../stores/Workout';
  
  export default {
    setup() {
      const workoutStore = useWorkoutStore();
      return {
        ...workoutStore, // Retorna les propietats de la store
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estils per al component de Workout */
  select {
    margin: 10px 0;
  }
  
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  </style>
  