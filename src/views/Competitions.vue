<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Competitions</h2>
    <ul>
      <li v-for="competition in competitions" :key="competition.id">
        {{ competition.name }} - {{ competition.date }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useWorkoutStore } from "../stores/Workout";

export default {
  setup() {
    const workoutStore = useWorkoutStore();

    return {
      competitions: workoutStore.competitions, // Accedim a les competicions des de la store
    };
  },
};
</script>

<style scoped>
/* Estils específics per a competicions */
</style>
